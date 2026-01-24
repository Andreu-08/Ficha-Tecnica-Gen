import { useId } from 'react'

/**
 * FormSelect - Componente de selector desplegable reutilizable con accesibilidad.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.label - Etiqueta del campo
 * @param {string} props.value - Valor seleccionado actual
 * @param {Function} props.onChange - Manejador de cambios
 * @param {Array<{valor: string, etiqueta: string}|string>} props.options - Opciones del selector
 * @param {boolean} [props.small=false] - Si usa estilo pequeño
 * @param {string} [props.name] - Nombre del campo para formularios
 * @param {boolean} [props.required=false] - Si el campo es requerido
 */
export function FormSelect({ 
  label, 
  value, 
  onChange, 
  options, 
  small = false,
  name,
  required = false,
}) {
  // Generar ID único para conectar label con select
  const selectId = useId()

  /**
   * Normaliza las opciones a formato objeto si vienen como strings.
   * @param {Array} opts - Array de opciones
   * @returns {Array<{valor: string, etiqueta: string}>}
   */
  const normalizarOpciones = (opts) => {
    return opts.map(opt => 
      typeof opt === 'string' 
        ? { valor: opt, etiqueta: opt }
        : opt
    )
  }

  const opcionesNormalizadas = normalizarOpciones(options)

  return (
    <div className="campo-formulario">
      <label 
        htmlFor={selectId} 
        className={small ? 'form-label text-xs' : 'form-label'}
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      <select 
        id={selectId}
        name={name || label?.toLowerCase().replace(/\s+/g, '-')}
        className="form-select" 
        value={value} 
        onChange={onChange}
        required={required}
      >
        {opcionesNormalizadas.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.etiqueta}
          </option>
        ))}
      </select>
    </div>
  )
}
