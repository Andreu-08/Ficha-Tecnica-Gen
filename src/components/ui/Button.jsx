import { Plus } from 'lucide-react'

/**
 * BotonAnadir - Botón especializado para añadir elementos a listas.
 * Diseño compacto con icono de suma y trazo fino.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onClick - Manejador del clic
 * @param {string} props.children - Texto del botón
 * @param {boolean} [props.disabled=false] - Si el botón está deshabilitado
 * @param {string} [props.ariaLabel] - Etiqueta accesible opcional
 */
export function BotonAnadir({ onClick, children, disabled = false, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      className="btn-add"
      type="button"
      disabled={disabled}
      aria-label={ariaLabel || `Añadir ${children?.toLowerCase()}`}
    >
      <Plus size={12} strokeWidth={2} aria-hidden="true" /> {children}
    </button>
  )
}

// Mantener compatibilidad temporal (deprecado)
/** @deprecated Usar BotonAnadir */
export const AddButton = BotonAnadir
