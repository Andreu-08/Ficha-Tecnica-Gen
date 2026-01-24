import { ETIQUETAS_PREVIEW, ARIA_LABELS } from '../../constants'

/**
 * ListaAlergenosReceta - Muestra los alérgenos en la vista previa de la receta.
 * Según Reglamento (UE) nº 1169/2011 - 14 alérgenos obligatorios.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string[]} props.alergenos - IDs de alérgenos presentes en la receta
 * @param {Array} props.listaAlergenos - Lista completa de alérgenos con iconos
 */
export function RecipeAllergensList({ alergenos, listaAlergenos }) {
  // Filtrar solo los alérgenos activos y ordenar por número EU
  const alergenosActivos = listaAlergenos
    .filter((a) => alergenos?.includes(a.id))
    .sort((a, b) => (a.numero || 0) - (b.numero || 0))

  // Si no hay alérgenos, mostrar mensaje de "sin alérgenos"
  if (alergenosActivos.length === 0) {
    return (
      <div className="sheet-section flex-shrink-0">
        <h3 className="sheet-section-header">
          {ETIQUETAS_PREVIEW.secciones.alergenos}
        </h3>
        <p className="text-[9px] text-brand-400 italic">
          Sin alérgenos declarados
        </p>
      </div>
    )
  }

  // Mostrar lista de alérgenos con iconos y números EU
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-2 flex-shrink-0">
      <h3 className="text-[8px] font-bold uppercase tracking-wider text-amber-700 mb-1.5 flex items-center justify-between">
        <span>{ETIQUETAS_PREVIEW.secciones.alergenos}</span>
      </h3>
      <div 
        className="flex flex-wrap gap-1"
        role="list"
        aria-label={ARIA_LABELS.listaAlergenos}
      >
        {alergenosActivos.map((alergeno) => {
          const Icono = alergeno.icon
          return (
            <div
              key={alergeno.id}
              className="flex items-center gap-0.5 rounded bg-amber-100 
                         px-1.5 py-0.5 text-[8px] font-medium text-amber-800"
              role="listitem"
              title={alergeno.descripcion}
            >
              <Icono size={10} strokeWidth={1.5} aria-hidden="true" />
              <span>{alergeno.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Mantener compatibilidad temporal
export const ListaAlergenosReceta = RecipeAllergensList
