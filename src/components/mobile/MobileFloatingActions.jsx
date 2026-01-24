import { useState, useCallback, useEffect, useRef } from 'react'
import { Plus, Eye, Share2, X } from 'lucide-react'

/**
 * MobileFloatingActions - Speed Dial FAB para acciones móviles.
 * Muestra un botón flotante principal que expande acciones secundarias.
 * 
 * Acciones:
 * - Vista Previa: abre modal con el documento
 * - Compartir: usa Web Share API para guardar/compartir
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onPreview - Callback para abrir vista previa
 * @param {Object} props.receta - Datos de la receta para compartir
 */
export function MobileFloatingActions({
  onPreview,
  receta
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef(null)

  // Toggle del menú
  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isExpanded])

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isExpanded) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isExpanded])

  // Manejador de vista previa
  const handlePreview = useCallback(() => {
    setIsExpanded(false)
    onPreview?.()
  }, [onPreview])

  // Manejador de compartir usando Web Share API
  const handleShare = useCallback(async () => {
    setIsExpanded(false)
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ficha Técnica: ${receta?.titulo || 'Receta'}`,
          text: 'Ficha técnica culinaria generada con Mokka Ficha Gen',
        })
      } catch (error) {
        // Usuario canceló o error - silenciar
        console.log('Share cancelled or failed:', error)
      }
    }
  }, [receta])

  // Detectar soporte de Web Share API
  const canShare = typeof navigator !== 'undefined' && !!navigator.share

  return (
    <>
      {/* Backdrop oscuro cuando está expandido */}
      <div 
        className={`mobile-fab-backdrop ${isExpanded ? 'mobile-fab-backdrop-visible' : ''}`}
        onClick={() => setIsExpanded(false)}
        aria-hidden="true"
      />

      {/* Contenedor del FAB */}
      <div 
        className="mobile-fab-container" 
        ref={containerRef}
        role="group"
        aria-label="Acciones de la ficha técnica"
      >
        {/* Acciones secundarias */}
        <div 
          className={`mobile-fab-actions ${isExpanded ? 'mobile-fab-actions-visible' : ''}`}
          aria-hidden={!isExpanded}
        >
          {/* Acción: Vista Previa */}
          <button
            className="mobile-fab-action mobile-fab-action-preview"
            onClick={handlePreview}
            tabIndex={isExpanded ? 0 : -1}
            aria-label="Ver vista previa del PDF"
          >
            <span className="mobile-fab-action-icon">
              <Eye size={18} strokeWidth={2} />
            </span>
            <span className="mobile-fab-action-label">Vista Previa</span>
          </button>

          {/* Acción: Compartir (si está disponible) */}
          {canShare && (
            <button
              className="mobile-fab-action mobile-fab-action-share"
              onClick={handleShare}
              tabIndex={isExpanded ? 0 : -1}
              aria-label="Compartir o guardar ficha técnica"
            >
              <span className="mobile-fab-action-icon">
                <Share2 size={18} strokeWidth={2} />
              </span>
              <span className="mobile-fab-action-label">Compartir</span>
            </button>
          )}
        </div>

        {/* FAB Principal */}
        <button
          className={`mobile-fab ${isExpanded ? 'mobile-fab-expanded' : ''}`}
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-haspopup="menu"
          aria-label={isExpanded ? 'Cerrar menú de acciones' : 'Abrir menú de acciones'}
        >
          <span className="mobile-fab-icon">
            {isExpanded ? (
              <X size={24} strokeWidth={2} />
            ) : (
              <Plus size={24} strokeWidth={2} />
            )}
          </span>
        </button>
      </div>
    </>
  )
}

export default MobileFloatingActions
