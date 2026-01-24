import { AlertTriangle } from 'lucide-react'
import { SeccionFormulario } from '../ui/FormSection'
import { BotonAlergeno } from '../ui/AllergenButton'
import { LISTA_ALERGENOS_UI, ETIQUETAS_FORMULARIO, ARIA_LABELS } from '../../constants'

/**
 * AlergenosReceta - Sección para selección de alérgenos.
 * Incluye los 14 alérgenos obligatorios según Reglamento (UE) nº 1169/2011.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string[]} props.alergenosSeleccionados - IDs de alérgenos seleccionados
 * @param {Function} props.onAlternar - Manejador para toggle de alérgeno
 */
export function RecipeAllergens({ alergenosSeleccionados, onAlternar }) {
  const etiquetas = ETIQUETAS_FORMULARIO.alergenos

  return (
    <SeccionFormulario 
      titulo={etiquetas.titulo} 
      icono={AlertTriangle} 
      abiertoPorDefecto
    >
      <div className="space-y-2">
        <p className="text-[10px] text-mokka-steel mb-2">
          Reglamento (UE) nº 1169/2011 — 14 alérgenos de declaración obligatoria
        </p>
        <div 
          className="allergen-grid"
          role="group"
          aria-label={ARIA_LABELS.listaAlergenos}
        >
          {LISTA_ALERGENOS_UI.map((alergeno) => (
            <BotonAlergeno
              key={alergeno.id}
              alergeno={alergeno}
              seleccionado={alergenosSeleccionados?.includes(alergeno.id) || false}
              onToggle={() => onAlternar(alergeno.id)}
            />
          ))}
        </div>
      </div>
    </SeccionFormulario>
  )
}

// Mantener compatibilidad temporal
export const AlergenosReceta = RecipeAllergens
