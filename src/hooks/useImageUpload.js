import { useRef, useCallback } from 'react'
import { LIMITES_IMAGEN, MENSAJES } from '../constants'

/**
 * Hook personalizado para gestionar la subida de imágenes y conversión a base64.
 * Incluye validación de tipo y tamaño de archivo configurable.
 * 
 * @param {Function} onCambioImagen - Callback cuando cambia la imagen
 * @param {Object} [opciones] - Opciones de configuración
 * @param {number} [opciones.tamanoMaximo] - Tamaño máximo en bytes
 * @param {string[]} [opciones.tiposPermitidos] - Tipos MIME permitidos
 * @returns {Object} Utilidades para subida de imágenes
 */
export function useImageUpload(onCambioImagen, opciones = {}) {
  const {
    tamanoMaximo = LIMITES_IMAGEN.tamanoMaximo,
    tiposPermitidos = LIMITES_IMAGEN.tiposPermitidos,
  } = opciones

  const referenciaInput = useRef(null)

  /**
   * Valida el archivo seleccionado.
   * @param {File} archivo - Archivo a validar
   * @returns {{ valido: boolean, error?: string }}
   */
  const validarArchivo = useCallback((archivo) => {
    // Validar tipo de archivo
    if (!tiposPermitidos.includes(archivo.type)) {
      return { 
        valido: false, 
        error: MENSAJES.tipoNoPermitido 
      }
    }

    // Validar tamaño de archivo
    if (archivo.size > tamanoMaximo) {
      return { 
        valido: false, 
        error: `${MENSAJES.imagenMuyGrande} ${LIMITES_IMAGEN.tamanoMaximoTexto}` 
      }
    }

    return { valido: true }
  }, [tamanoMaximo, tiposPermitidos])

  /**
   * Maneja la selección de archivo y lo convierte a base64.
   * @param {Event} evento - Evento de cambio del input de archivo
   */
  const manejarSubidaImagen = useCallback((evento) => {
    const archivo = evento.target.files[0]
    if (!archivo) return

    // Validar archivo
    const { valido, error } = validarArchivo(archivo)
    if (!valido) {
      // Usar callback en lugar de alert para permitir UI personalizada
      console.warn(error)
      alert(error)
      return
    }

    // Leer y convertir a base64
    const lector = new FileReader()
    lector.onloadend = () => {
      onCambioImagen(lector.result)
    }
    lector.onerror = () => {
      console.error(MENSAJES.errorImagen)
      alert(MENSAJES.errorImagen)
    }
    lector.readAsDataURL(archivo)
  }, [onCambioImagen, validarArchivo])

  /**
   * Limpia la imagen actual.
   */
  const limpiarImagen = useCallback(() => {
    onCambioImagen(null)
    if (referenciaInput.current) {
      referenciaInput.current.value = ''
    }
  }, [onCambioImagen])

  /**
   * Dispara el clic del input de archivo programáticamente.
   */
  const activarSubida = useCallback(() => {
    referenciaInput.current?.click()
  }, [])

  return {
    referenciaInput,
    manejarSubidaImagen,
    limpiarImagen,
    activarSubida,
    // Mantener compatibilidad temporal (deprecado)
    fileInputRef: referenciaInput,
    handleImageUpload: manejarSubidaImagen,
    clearImage: limpiarImagen,
    triggerUpload: activarSubida,
  }
}
