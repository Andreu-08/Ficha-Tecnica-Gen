import { useId } from 'react'

/**
 * FormTextarea - Componente de área de texto reutilizable con accesibilidad.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.label] - Etiqueta del campo (opcional)
 * @param {string} props.value - Valor actual del textarea
 * @param {Function} props.onChange - Manejador de cambios
 * @param {string} [props.placeholder] - Texto placeholder
 * @param {number} [props.rows=4] - Número de filas visibles
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {string} [props.name] - Nombre del campo para formularios
 * @param {number} [props.maxLength] - Longitud máxima de caracteres
 * @param {boolean} [props.required=false] - Si el campo es requerido
 */
export function FormTextarea({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  rows = 4, 
  className = '',
  name,
  maxLength,
  required = false,
}) {
  // Generar ID único para conectar label con textarea
  const textareaId = useId()
  const contadorId = useId()

  // Calcular caracteres restantes si hay maxLength
  const caracteresRestantes = maxLength ? maxLength - (value?.length || 0) : null

  return (
    <div className="campo-formulario">
      {label && (
        <label 
          htmlFor={textareaId} 
          className="form-label"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name || label?.toLowerCase().replace(/\s+/g, '-')}
        className={`form-textarea ${className}`}
        style={{ height: `${rows * 1.5}rem` }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        aria-describedby={maxLength ? contadorId : undefined}
      />
      {maxLength && (
        <p 
          id={contadorId} 
          className={`text-xs mt-1 text-right ${caracteresRestantes < 50 ? 'text-amber-500' : 'text-brand-400'}`}
          aria-live="polite"
        >
          {caracteresRestantes} caracteres restantes
        </p>
      )}
    </div>
  )
}
