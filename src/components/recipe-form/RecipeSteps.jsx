import { ChefHat } from 'lucide-react'
import { SeccionFormulario } from '../ui/FormSection'
import { InputElementoLista } from '../ui/ArrayItemInput'
import { BotonAnadir } from '../ui/Button'
import { ETIQUETAS_FORMULARIO, LIMITES_LISTAS, ARIA_LABELS } from '../../constants'

/**
 * PasosReceta - Sección para gestión de pasos de elaboración.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string[]} props.pasos - Lista de pasos
 * @param {Function} props.onCambiar - Manejador de cambios en array
 * @param {Function} props.onAnadir - Manejador para añadir elemento
 * @param {Function} props.onEliminar - Manejador para eliminar elemento
 */
export function RecipeSteps({ pasos, onCambiar, onAnadir, onEliminar }) {
  const etiquetas = ETIQUETAS_FORMULARIO.pasos
  const limiteAlcanzado = pasos?.length >= LIMITES_LISTAS.maxPasos

  return (
    <SeccionFormulario titulo={etiquetas.titulo} icono={ChefHat}>
      <div 
        className="space-y-3"
        role="list"
        aria-label={ARIA_LABELS.listaPasos}
      >
        {pasos?.map((paso, indice) => (
          <InputElementoLista
            key={indice}
            indice={indice}
            value={paso}
            onChange={(e) => onCambiar('pasos', indice, e.target.value)}
            onRemove={() => onEliminar('pasos', indice)}
            placeholder={etiquetas.placeholder}
            multilinea
            tipoElemento="paso"
          />
        ))}
        
        <BotonAnadir 
          onClick={() => onAnadir('pasos')}
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
export const PasosReceta = RecipeSteps
