import { useEffect, useRef, useCallback } from 'react'
import { ArrowLeft, Share2 } from 'lucide-react'
import { TechSheet } from '../recipe-preview/TechSheet'
import { handlePrint } from '../../utils/print'

/**
 * MobilePreviewModal - Modal fullscreen para vista previa del PDF en móvil.
 * Muestra el documento A4 directamente sin controles de zoom ni botones extra.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Si el modal está abierto
 * @param {Function} props.onClose - Callback para cerrar el modal (volver a editar)
 * @param {Object} props.receta - Datos de la receta
 */
export function MobilePreviewModal({
  isOpen,
  onClose,
  receta
}) {
  const modalRef = useRef(null)
  const previousActiveElement = useRef(null)

  // Focus trap y gestión de focus
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement
      if (modalRef.current) {
        modalRef.current.focus()
      }
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Manejar compartir - abre diálogo de impresión
  const handleShare = useCallback(() => {
    handlePrint()
  }, [])

  return (
    <div
      ref={modalRef}
      className={`mobile-preview-modal ${isOpen ? 'mobile-preview-modal-visible' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Vista previa de la ficha técnica"
      tabIndex={-1}
    >
      {/* Header del modal - Simple con botón volver */}
      <header className="mobile-preview-header">
        <button
          className="mobile-preview-back"
          onClick={onClose}
          aria-label="Volver al formulario"
        >
          <ArrowLeft size={20} strokeWidth={2} />
          <span>Editar</span>
        </button>
        
        <h2 className="mobile-preview-title">Vista Previa</h2>
        
        {/* Botón compartir en header */}
        <button
          className="mobile-preview-share"
          onClick={handleShare}
          aria-label="Compartir ficha técnica"
        >
          <Share2 size={20} strokeWidth={2} />
        </button>
      </header>

      {/* Contenido - Solo el documento A4 */}
      <div className="mobile-preview-content">
        {isOpen && (
          <div className="mobile-preview-document">
            <TechSheet receta={receta} />
          </div>
        )}
      </div>
    </div>
  )
}

export default MobilePreviewModal

