import { useId } from 'react'
import { Trash2 } from 'lucide-react'

/**
 * BotonEliminar - Botón de icono para eliminar elementos.
 * Estilo técnico con trazo fino.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onClick - Manejador del clic
 * @param {string} props.ariaLabel - Etiqueta accesible
 */
function BotonEliminar({ onClick, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      className="btn-icon-sm flex-shrink-0 transition-colors
                 focus:outline-none focus:ring-2 focus:ring-red-300/50"
      style={{
        color: 'var(--mokka-slate)',
        borderRadius: '4px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#dc2626'
        e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--mokka-slate)'
        e.currentTarget.style.background = 'transparent'
      }}
      type="button"
      aria-label={ariaLabel}
    >
      <Trash2 size={14} strokeWidth={1.5} aria-hidden="true" />
    </button>
  )
}

/**
 * InputElementoLista - Campo de entrada con botón de eliminar para elementos de array.
 * Soporta modo multilínea para pasos de elaboración.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.value - Valor actual del input
 * @param {Function} props.onChange - Manejador de cambios
 * @param {Function} props.onRemove - Manejador para eliminar elemento
 * @param {string} [props.placeholder] - Texto placeholder
 * @param {boolean} [props.multilinea=false] - Si usa textarea en lugar de input
 * @param {number} props.indice - Índice del elemento en el array
 * @param {string} [props.tipoElemento='elemento'] - Tipo de elemento para accesibilidad
 */
export function InputElementoLista({ 
  value, 
  onChange, 
  onRemove, 
  placeholder, 
  multilinea = false, 
  indice,
  tipoElemento = 'elemento',
}) {
  const inputId = useId()
  const numeroElemento = indice + 1
  const etiquetaEliminar = `Eliminar ${tipoElemento} ${numeroElemento}`

  // Modo multilínea para pasos de elaboración
  if (multilinea) {
    return (
      <div className="flex items-start gap-2" role="listitem">
        {/* Indicador numérico del paso - Estilo técnico */}
        <div 
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center 
                     text-[10px] font-bold text-white mt-1"
          style={{
            background: 'var(--mokka-charcoal)',
            borderRadius: '4px'
          }}
          aria-hidden="true"
        >
          {numeroElemento}
        </div>
        
        <textarea
          id={inputId}
          className="form-textarea flex-1 min-h-[60px]"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={`${tipoElemento} ${numeroElemento}`}
        />
        
        <div className="mt-1">
          <BotonEliminar onClick={onRemove} ariaLabel={etiquetaEliminar} />
        </div>
      </div>
    )
  }

  // Modo input simple para ingredientes
  return (
    <div className="list-item" role="listitem">
      <input
        id={inputId}
        className="list-item-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={`${tipoElemento} ${numeroElemento}`}
      />
      <BotonEliminar onClick={onRemove} ariaLabel={etiquetaEliminar} />
    </div>
  )
}

// Mantener compatibilidad temporal (deprecado)
/** @deprecated Usar InputElementoLista */
export const ArrayItemInput = InputElementoLista
