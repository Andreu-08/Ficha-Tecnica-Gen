/**
 * @fileoverview Generador de PDF para compartir en móvil.
 * Usa html2canvas + jspdf para generar PDF idéntico al de desktop.
 * @module utils/pdfGenerator
 */

import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

// Dimensiones A4 en píxeles (96 DPI) - mismas que desktop
const A4_WIDTH_PX = 794
const A4_HEIGHT_PX = 1123

/**
 * Invierte los colores de una imagen usando canvas (simula filter:invert(1))
 * @param {string} src - URL de la imagen
 * @returns {Promise<string>} Data URL de la imagen invertida
 */
async function invertImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')

            // Dibujar imagen
            ctx.drawImage(img, 0, 0)

            // Obtener datos de píxeles
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data

            // brightness(0) convierte todo a negro, invert(1) lo hace blanco
            // Resultado: todos los píxeles visibles se vuelven blancos
            for (let i = 0; i < data.length; i += 4) {
                // Si el píxel tiene algo de contenido (no es transparente)
                if (data[i + 3] > 0) {
                    // Hacer blanco
                    data[i] = 255       // R
                    data[i + 1] = 255   // G
                    data[i + 2] = 255   // B
                }
            }

            ctx.putImageData(imageData, 0, 0)
            resolve(canvas.toDataURL('image/png'))
        }
        img.onerror = reject
        img.src = src
    })
}

/**
 * Genera un PDF de la ficha técnica y lo retorna como File.
 * Renderiza dinámicamente el TechSheet con estilos desktop.
 * @param {Object} receta - Datos de la receta
 * @returns {Promise<File|null>} Archivo PDF o null si hay error
 */
export async function generatePdfFromReceta(receta) {
    try {
        // Importar dinámicamente React y el componente TechSheet
        const React = await import('react')
        const { createRoot } = await import('react-dom/client')
        const { TechSheet } = await import('../components/recipe-preview/TechSheet')

        // Crear contenedor temporal oculto con dimensiones A4 exactas
        const container = document.createElement('div')
        container.id = 'pdf-render-container'
        container.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: ${A4_WIDTH_PX}px;
      height: ${A4_HEIGHT_PX}px;
      background: white;
      z-index: -1;
      overflow: hidden;
    `
        document.body.appendChild(container)

        // Renderizar TechSheet en el contenedor
        const root = createRoot(container)

        await new Promise((resolve) => {
            root.render(
                React.createElement(TechSheet, { receta })
            )
            // Esperar a que el DOM se actualice y las imágenes carguen
            setTimeout(resolve, 500)
        })

        // html2canvas no soporta filter:invert(), así que invertimos los logos manualmente
        const logos = container.querySelectorAll('.tech-sheet-logo, .tech-footer-logo')
        await Promise.all(Array.from(logos).map(async (logo) => {
            try {
                const invertedSrc = await invertImage(logo.src)
                logo.src = invertedSrc
            } catch (e) {
                console.warn('No se pudo invertir logo:', e)
            }
        }))

        // Inyectar CSS específico para corregir alineación de alérgenos
        // Copiar EXACTAMENTE los estilos que funcionan en desktop
        const styleElement = document.createElement('style')
        styleElement.textContent = `
            #pdf-render-container .tech-allergen-chip-full {
                display: flex !important;
                align-items: center !important;
                gap: 0.25rem !important; /* gap-1 = 4px */
                padding: 0.25rem 0.5rem !important; /* px-2 py-1 */
                font-size: 9px !important;
                font-weight: 600 !important;
                line-height: 1 !important;
            }
            #pdf-render-container .tech-allergen-chip-full svg {
                flex-shrink: 0 !important;
                vertical-align: middle !important;
                width: 12px !important;
                height: 12px !important;
            }
        `
        container.appendChild(styleElement)

        // Esperar más tiempo para asegurar que CSS se aplica
        await new Promise(resolve => setTimeout(resolve, 300))

        // Capturar el elemento como canvas
        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: A4_WIDTH_PX,
            height: A4_HEIGHT_PX,
            logging: false,
        })

        // Crear PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        })

        const imgData = canvas.toDataURL('image/jpeg', 0.95)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)

        // Limpiar
        root.unmount()
        document.body.removeChild(container)

        // Convertir a File
        const filename = `Ficha_${(receta?.titulo || 'Receta').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
        const pdfBlob = pdf.output('blob')
        const pdfFile = new File([pdfBlob], filename, { type: 'application/pdf' })

        return pdfFile
    } catch (error) {
        console.error('Error generando PDF:', error)
        return null
    }
}

/**
 * Verifica si el navegador soporta compartir archivos.
 * @returns {boolean}
 */
export function canShareFiles() {
    return typeof navigator !== 'undefined' &&
        navigator.canShare &&
        navigator.share
}

/**
 * Comparte un archivo PDF usando Web Share API.
 * @param {File} pdfFile - Archivo PDF a compartir
 * @param {string} title - Título para el diálogo de compartir
 * @returns {Promise<boolean>} true si se compartió correctamente
 */
export async function sharePdfFile(pdfFile, title = 'Ficha Técnica') {
    // Verificar si se puede compartir este tipo de archivo
    const shareData = {
        files: [pdfFile],
        title: title,
        text: 'Ficha técnica culinaria'
    }

    if (canShareFiles() && navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData)
            return true
        } catch (error) {
            if (error.name === 'AbortError') {
                return false // Usuario canceló
            }
            console.error('Error compartiendo:', error)
        }
    }

    // Fallback: descargar el archivo
    downloadPdfFile(pdfFile)
    return false
}

/**
 * Descarga un archivo PDF (fallback).
 * @param {File} pdfFile - Archivo PDF a descargar
 */
export function downloadPdfFile(pdfFile) {
    const url = URL.createObjectURL(pdfFile)
    const link = document.createElement('a')
    link.href = url
    link.download = pdfFile.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
