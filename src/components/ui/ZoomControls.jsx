import { ZoomIn, ZoomOut } from 'lucide-react'
import { CONFIG_ZOOM, ETIQUETAS_ACCIONES } from '../../constants'

/**
 * ControlesZoom - Controles de zoom para la vista previa del documento.
 * Incluye botones de aumentar, reducir y mostrador del nivel actual.
 * Estilo técnico con iconos de trazo fino (strokeWidth: 1.5)
 * 
 * @param {Object} props - Propiedades del componente
 * @param {number} props.zoom - Nivel de zoom actual (50-150)
 * @param {Function} props.onAumentar - Manejador para aumentar zoom
 * @param {Function} props.onReducir - Manejador para reducir zoom
 * @param {Function} props.onReiniciar - Manejador para reiniciar zoom a 100%
 */
export function ControlesZoom({ zoom, onAumentar, onReducir, onReiniciar }) {
  const { minimo, maximo } = CONFIG_ZOOM
  const zoomMinimo = minimo * 100
  const zoomMaximo = maximo * 100

  return (
    <div 
      className="zoom-controls" 
      role="group" 
      aria-label={ETIQUETAS_ACCIONES.zoom.aumentar}
    >
      {/* Botón reducir */}
      <button
        onClick={onReducir}
        className="zoom-btn"
        type="button"
        aria-label={ETIQUETAS_ACCIONES.zoom.reducir}
        disabled={zoom <= zoomMinimo}
      >
        <ZoomOut size={16} strokeWidth={1.5} aria-hidden="true" />
      </button>

      {/* Mostrador de nivel / Botón reiniciar */}
      <button
        onClick={onReiniciar}
        className="zoom-display cursor-pointer transition-colors"
        style={{ borderRadius: '4px' }}
        type="button"
        aria-label={ETIQUETAS_ACCIONES.zoom.reiniciar}
      >
        {zoom}%
      </button>

      {/* Botón aumentar */}
      <button
        onClick={onAumentar}
        className="zoom-btn"
        type="button"
        aria-label={ETIQUETAS_ACCIONES.zoom.aumentar}
        disabled={zoom >= zoomMaximo}
      >
        <ZoomIn size={16} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  )
}

// Mantener compatibilidad temporal (deprecado)
/** @deprecated Usar ControlesZoom */
export const ZoomControls = ControlesZoom
