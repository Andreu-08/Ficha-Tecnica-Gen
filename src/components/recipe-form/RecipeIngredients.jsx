import { useId } from 'react'
import { Scale, Trash2 } from 'lucide-react'
import { SeccionFormulario } from '../ui/FormSection'
import { BotonAnadir } from '../ui/Button'
import { ETIQUETAS_FORMULARIO, LIMITES_LISTAS, ARIA_LABELS } from '../../constants'
import { OPCIONES_UNIDADES } from '../../constants/options'

/**
 * InputIngrediente - Campo de entrada con cantidad, unidad y nombre para ingredientes.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.ingrediente - Objeto con cantidad, unidad y nombre
 * @param {Function} props.onChange - Manejador de cambios
 * @param {Function} props.onRemove - Manejador para eliminar
 * @param {number} props.indice - Índice del elemento
 * @param {string} props.placeholder - Texto placeholder
 */
function InputIngrediente({ ingrediente, onChange, onRemove, indice, placeholder }) {
  const inputId = useId()
  const numeroElemento = indice + 1

  return (
    <div 
      className="list-item" 
      role="listitem"
      style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}
    >
      {/* Número del ingrediente */}
      <div className="list-item-number">{numeroElemento}</div>
      
      {/* Input de cantidad */}
      <input
        type="number"
        value={ingrediente.cantidad || ''}
        onChange={(e) => onChange({ ...ingrediente, cantidad: e.target.value })}
        placeholder="0"
        className="list-item-input"
        style={{ 
          width: '60px',
          minWidth: '60px',
          maxWidth: '60px',
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '13px',
          borderRight: '1px solid rgba(177, 196, 193, 0.25)'
        }}
        aria-label={`Cantidad del ingrediente ${numeroElemento}`}
      />
      
      {/* Selector de unidad */}
      <select
        value={ingrediente.unidad || 'g'}
        onChange={(e) => onChange({ ...ingrediente, unidad: e.target.value })}
        className="list-item-input"
        style={{ 
          width: '60px',
          minWidth: '60px',
          maxWidth: '60px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '13px',
          paddingRight: '20px',
          paddingLeft: '8px',
          textAlign: 'left',
          borderRight: '1px solid rgba(177, 196, 193, 0.25)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23b1c4c1' d='M5 7L1 3h8z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 6px center',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none'
        }}
        aria-label={`Unidad del ingrediente ${numeroElemento}`}
      >
        {OPCIONES_UNIDADES.map(opcion => (
          <option 
            key={opcion.valor} 
            value={opcion.valor}
            style={{ 
              padding: '8px',
              fontSize: '14px',
              backgroundColor: 'white',
              color: '#2d3639'
            }}
          >
            {opcion.etiqueta}
          </option>
        ))}
      </select>
      
      {/* Input del nombre del ingrediente - MÁS GRANDE */}
      <input
        id={inputId}
        type="text"
        value={ingrediente.nombre || ''}
        onChange={(e) => onChange({ ...ingrediente, nombre: e.target.value })}
        placeholder={placeholder}
        className="list-item-input"
        style={{ 
          flex: '1 1 auto',
          minWidth: '0',
          fontWeight: '500',
          fontSize: '13px'
        }}
        aria-label={`Nombre del ingrediente ${numeroElemento}`}
      />
      
      {/* Botón eliminar */}
      <button
        onClick={onRemove}
        className="btn-icon-sm flex-shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300/50"
        style={{
          color: 'var(--mokka-slate)',
          borderRadius: '4px',
          flexShrink: 0
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
        aria-label={`Eliminar ingrediente ${numeroElemento}`}
      >
        <Trash2 size={14} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  )
}

/**
 * IngredientesReceta - Sección para gestión de lista de ingredientes con cantidad y unidad.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array<{cantidad: string, unidad: string, nombre: string}>} props.ingredientes - Lista de ingredientes
 * @param {Function} props.onCambiar - Manejador de cambios en array
 * @param {Function} props.onAnadir - Manejador para añadir elemento
 * @param {Function} props.onEliminar - Manejador para eliminar elemento
 */
export function RecipeIngredients({ ingredientes, onCambiar, onAnadir, onEliminar }) {
  const etiquetas = ETIQUETAS_FORMULARIO.ingredientes
  const limiteAlcanzado = ingredientes?.length >= LIMITES_LISTAS.maxIngredientes

  return (
    <SeccionFormulario titulo={etiquetas.titulo} icono={Scale}>
      <div 
        className="space-y-2"
        role="list"
        aria-label={ARIA_LABELS.listaIngredientes}
      >
        {ingredientes?.map((ingrediente, indice) => (
          <InputIngrediente
            key={indice}
            ingrediente={ingrediente}
            onChange={(updated) => onCambiar('ingredientes', indice, updated)}
            onRemove={() => onEliminar('ingredientes', indice)}
            indice={indice}
            placeholder={etiquetas.placeholder}
          />
        ))}
        
        <BotonAnadir 
          onClick={() => onAnadir('ingredientes')}
          disabled={limiteAlcanzado}
          ariaLabel={etiquetas.botonAnadir}
        >
          {etiquetas.botonAnadir}
        </BotonAnadir>
      </div>
    </SeccionFormulario>
  )
}

// Mantener compatibilidad temporal
export const IngredientesReceta = RecipeIngredients
