import { MessageSquare } from 'lucide-react'
import { SeccionFormulario } from '../ui/FormSection'
import { FormTextarea } from '../ui/FormTextarea'
import { ETIQUETAS_FORMULARIO, LIMITES_TEXTO } from '../../constants'

/**
 * NotasReceta - Sección para notas de emplatado.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.notas - Contenido de las notas
 * @param {Function} props.onCambiar - Manejador para actualizar notas
 */
export function RecipeNotes({ notas, onCambiar }) {
  const etiquetas = ETIQUETAS_FORMULARIO.notas

  return (
    <SeccionFormulario titulo={etiquetas.titulo} icono={MessageSquare}>
      <FormTextarea
        value={notas}
        onChange={(e) => onCambiar('notas', e.target.value)}
        placeholder={etiquetas.placeholder}
        rows={3}
        maxLength={LIMITES_TEXTO.maxNotas}
        name="notas-emplatado"
      />
    </SeccionFormulario>
  )
}

// Mantener compatibilidad temporal
export const NotasReceta = RecipeNotes
