import { Scale } from 'lucide-react'
import { SeccionFormulario } from '../ui/FormSection'
import { FormInput } from '../ui/FormInput'
import { FormSelect } from '../ui/FormSelect'
import { 
  ETIQUETAS_FORMULARIO, 
  OPCIONES_TEMPERATURA,
  OPCIONES_CONSERVACION 
} from '../../constants'

/**
 * ParametrosReceta - Sección para parámetros de cocina (tiempos, raciones, coste, etc.)
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.receta - Estado actual de la receta
 * @param {Function} props.onActualizar - Manejador para actualizar campos
 */
export function RecipeParameters({ receta, onActualizar }) {
  const etiquetas = ETIQUETAS_FORMULARIO.parametros

  return (
    <SeccionFormulario 
      titulo={etiquetas.titulo} 
      icono={Scale} 
      abiertoPorDefecto
    >
      <div className="grid grid-cols-2 gap-3">
        {/* Tiempo de preparación */}
        <FormInput
          label={etiquetas.tiempoPrep}
          type="number"
          value={receta.tiempoPreparacion}
          onChange={(e) => onActualizar('tiempoPreparacion', e.target.value)}
          name="tiempo-preparacion"
        />
        
        {/* Tiempo de cocción */}
        <FormInput
          label={etiquetas.tiempoCoccion}
          type="number"
          value={receta.tiempoCoccion}
          onChange={(e) => onActualizar('tiempoCoccion', e.target.value)}
          name="tiempo-coccion"
        />
        
        {/* Raciones */}
        <FormInput
          label={etiquetas.raciones}
          value={receta.raciones}
          onChange={(e) => onActualizar('raciones', e.target.value)}
          name="raciones"
        />
        
        {/* Temperatura de pase */}
        <FormSelect
          label={etiquetas.temperatura}
          value={receta.temperatura}
          onChange={(e) => onActualizar('temperatura', e.target.value)}
          options={OPCIONES_TEMPERATURA}
          name="temperatura"
        />
        
        {/* Caducidad */}
        <FormInput
          label={etiquetas.caducidad}
          value={receta.caducidad}
          onChange={(e) => onActualizar('caducidad', e.target.value)}
          name="caducidad"
        />
        
        {/* Coste */}
        <FormInput
          label={etiquetas.coste}
          value={receta.coste}
          onChange={(e) => onActualizar('coste', e.target.value)}
          name="coste"
        />
        
        {/* Conservación - Ocupa 2 columnas */}
        <div className="col-span-2">
          <FormSelect
            label={etiquetas.conservacion}
            value={receta.conservacion}
            onChange={(e) => onActualizar('conservacion', e.target.value)}
            options={OPCIONES_CONSERVACION}
            name="conservacion"
          />
        </div>
      </div>
    </SeccionFormulario>
  )
}

// Mantener compatibilidad temporal
export const ParametrosReceta = RecipeParameters
