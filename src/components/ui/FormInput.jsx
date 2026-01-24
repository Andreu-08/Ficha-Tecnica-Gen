import { useId } from 'react'

/**
 * FormInput - Componente de input de texto reutilizable con accesibilidad.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.label - Etiqueta del campo
 * @param {string} props.value - Valor actual del input
 * @param {Function} props.onChange - Manejador de cambios
 * @param {string} [props.placeholder] - Texto placeholder
 * @param {string} [props.type='text'] - Tipo de input (text, number, etc.)
 * @param {boolean} [props.large=false] - Si usa estilo grande
 * @param {string} [props.name] - Nombre del campo para formularios
 * @param {string} [props.error] - Mensaje de error para validación
 * @param {boolean} [props.required=false] - Si el campo es requerido
 */
export function FormInput({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  large = false,
  name,
  error,
  required = false,
}) {
  // Generar ID único para conectar label con input
  const inputId = useId()
  const errorId = useId()

  return (
    <div className="campo-formulario">
      <label 
        htmlFor={inputId} 
        className="form-label"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      <input
        id={inputId}
        name={name || label?.toLowerCase().replace(/\s+/g, '-')}
        type={type}
        className={`${large ? 'form-input-large' : 'form-input'} ${error ? 'border-red-500' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="text-red-500 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
