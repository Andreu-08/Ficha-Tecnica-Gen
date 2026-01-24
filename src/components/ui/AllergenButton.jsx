/**
 * BotonAlergeno - Botón toggle para selección de alérgenos.
 * Implementa accesibilidad con aria-pressed para estado toggle.
 * Muestra número EU según Reglamento 1169/2011.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.alergeno - Datos del alérgeno
 * @param {string} props.alergeno.id - ID único del alérgeno
 * @param {number} props.alergeno.numero - Número según normativa EU (1-14)
 * @param {string} props.alergeno.label - Nombre del alérgeno
 * @param {Component} props.alergeno.icon - Componente de icono Lucide
 * @param {boolean} props.seleccionado - Si el alérgeno está seleccionado
 * @param {Function} props.onToggle - Manejador del toggle
 */
export function BotonAlergeno({ alergeno, seleccionado, onToggle }) {
  const Icono = alergeno.icon

  return (
    <button
      onClick={onToggle}
      className={`allergen-chip ${seleccionado ? 'allergen-chip-active' : ''}`}
      type="button"
      aria-pressed={seleccionado}
      aria-label={`${alergeno.numero}. ${alergeno.label} - ${seleccionado ? 'seleccionado' : 'no seleccionado'}`}
    >
      <span className="allergen-number">{alergeno.numero}</span>
      <Icono size={14} strokeWidth={1.5} aria-hidden="true" />
      <span className="truncate">{alergeno.label}</span>
    </button>
  )
}

// Mantener compatibilidad temporal (deprecado)
/** @deprecated Usar BotonAlergeno */
export const AllergenButton = BotonAlergeno
