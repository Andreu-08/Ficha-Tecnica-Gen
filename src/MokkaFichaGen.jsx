import { useState, useCallback } from 'react'
import { useRecipeStorage } from './hooks/useRecipeStorage'
import { useImageUpload } from './hooks/useImageUpload'
import { useRecipeActions } from './hooks/useRecipeActions'
import { useMobileDetection } from './hooks/useMobileDetection'
import { handlePrint } from './utils/print'
import { CONFIG_ZOOM } from './constants'
import { RecipeForm } from './components/RecipeForm'
import { RecipePreview } from './components/RecipePreview'
import { MobileLayout } from './components/mobile/MobileLayout'
import { MobileFloatingActions } from './components/mobile/MobileFloatingActions'
import { MobilePreviewModal } from './components/mobile/MobilePreviewModal'

/**
 * MokkaFichaGen - Componente principal de la aplicación.
 * Orquesta el estado global y distribuye a los paneles de formulario y vista previa.
 * 
 * Layout:
 * - Mobile (<768px): Solo formulario + FAB para acciones + modal vista previa on-demand
 * - Desktop (≥768px): Formulario izquierda (ancho fijo) + Vista previa derecha (flex)
 * 
 * @component
 */
export default function MokkaFichaGen() {
  // ========================================
  // Detección de modo móvil
  // ========================================
  
  const { isMobile } = useMobileDetection()

  // ========================================
  // Hooks personalizados para gestión de estado
  // ========================================
  
  const { 
    receta, 
    setReceta, 
    actualizarCampo, 
    reiniciarReceta 
  } = useRecipeStorage()
  
  const { 
    manejarCambioArray, 
    anadirElementoArray, 
    eliminarElementoArray, 
    alternarAlergeno 
  } = useRecipeActions(receta, setReceta)
  
  const { 
    referenciaInput, 
    manejarSubidaImagen 
  } = useImageUpload((imagen) => actualizarCampo('imagen', imagen))

  // ========================================
  // Estado del zoom para la vista previa
  // ========================================
  
  const [zoom, setZoom] = useState(CONFIG_ZOOM.inicial * 100)

  // ========================================
  // Estado del modal de vista previa móvil
  // ========================================
  
  const [showMobilePreview, setShowMobilePreview] = useState(false)

  // ========================================
  // Manejadores del zoom
  // ========================================
  
  /** Aumenta el zoom respetando el límite máximo */
  const aumentarZoom = useCallback(() => {
    setZoom((prev) => Math.min(prev + CONFIG_ZOOM.paso * 100, CONFIG_ZOOM.maximo * 100))
  }, [])

  /** Reduce el zoom respetando el límite mínimo */
  const reducirZoom = useCallback(() => {
    setZoom((prev) => Math.max(prev - CONFIG_ZOOM.paso * 100, CONFIG_ZOOM.minimo * 100))
  }, [])

  /** Reinicia el zoom al valor inicial (100%) */
  const reiniciarZoom = useCallback(() => {
    setZoom(CONFIG_ZOOM.inicial * 100)
  }, [])

  /** Maneja el zoom con la rueda del ratón */
  const manejarZoomRueda = useCallback((delta) => {
    if (delta < 0) {
      aumentarZoom()
    } else {
      reducirZoom()
    }
  }, [aumentarZoom, reducirZoom])

  // ========================================
  // Manejador de impresión
  // ========================================
  
  const onImprimir = useCallback(() => {
    handlePrint(receta)
  }, [receta])

  // ========================================
  // Manejadores móviles
  // ========================================
  
  /** Abre el modal de vista previa en móvil */
  const handleOpenMobilePreview = useCallback(() => {
    setShowMobilePreview(true)
  }, [])

  /** Cierra el modal de vista previa en móvil */
  const handleCloseMobilePreview = useCallback(() => {
    setShowMobilePreview(false)
  }, [])

  // ========================================
  // Renderizado - Modo Móvil
  // ========================================
  
  if (isMobile) {
    return (
      <MobileLayout
        receta={receta}
        onActualizar={actualizarCampo}
        onReiniciar={reiniciarReceta}
        referenciaInputArchivo={referenciaInput}
        onSubirImagen={manejarSubidaImagen}
        manejarCambioArray={manejarCambioArray}
        anadirElementoArray={anadirElementoArray}
        eliminarElementoArray={eliminarElementoArray}
        alternarAlergeno={alternarAlergeno}
        onImprimir={onImprimir}
      >
        {/* FAB con acciones flotantes */}
        <MobileFloatingActions
          onPreview={handleOpenMobilePreview}
          receta={receta}
        />

        {/* Modal de vista previa on-demand */}
        <MobilePreviewModal
          isOpen={showMobilePreview}
          onClose={handleCloseMobilePreview}
          receta={receta}
        />
      </MobileLayout>
    )
  }

  // ========================================
  // Renderizado - Modo Desktop (sin cambios)
  // ========================================
  
  return (
    <main className="app-container">
      {/* Panel del formulario - Izquierda en desktop */}
      <RecipeForm
        receta={receta}
        onActualizar={actualizarCampo}
        onReiniciar={reiniciarReceta}
        referenciaInputArchivo={referenciaInput}
        onSubirImagen={manejarSubidaImagen}
        manejarCambioArray={manejarCambioArray}
        anadirElementoArray={anadirElementoArray}
        eliminarElementoArray={eliminarElementoArray}
        alternarAlergeno={alternarAlergeno}
        onImprimir={onImprimir}
      />

      {/* Panel de vista previa - Derecha en desktop */}
      <RecipePreview
        receta={receta}
        onImprimir={onImprimir}
        zoom={zoom}
        onAumentarZoom={aumentarZoom}
        onReducirZoom={reducirZoom}
        onReiniciarZoom={reiniciarZoom}
        onZoomRueda={manejarZoomRueda}
      />
    </main>
  )
}
