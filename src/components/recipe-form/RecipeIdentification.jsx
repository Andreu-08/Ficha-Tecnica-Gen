import { User, Camera } from 'lucide-react'
import { SeccionFormulario } from '../ui/FormSection'
import { FormInput } from '../ui/FormInput'
import { FormSelect } from '../ui/FormSelect'
import { 
  OPCIONES_DIFICULTAD, 
  ETIQUETAS_FORMULARIO,
  LIMITES_IMAGEN 
} from '../../constants'

/**
 * IdentificacionReceta - Sección para nombre, categoría, dificultad e imagen.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.receta - Estado actual de la receta
 * @param {Function} props.onActualizar - Manejador para actualizar campos
 * @param {Object} props.referenciaInputArchivo - Ref del input de archivo
 * @param {Function} props.onSubirImagen - Manejador de subida de imagen
 */
export function RecipeIdentification({ 
  receta, 
  onActualizar, 
  referenciaInputArchivo, 
  onSubirImagen 
}) {
  const etiquetas = ETIQUETAS_FORMULARIO.identificacion

  /**
   * Maneja el clic o teclado para activar la subida de imagen.
   */
  const activarSubidaImagen = () => {
    referenciaInputArchivo.current?.click()
  }

  /**
   * Maneja eventos de teclado para accesibilidad.
   * @param {KeyboardEvent} evento - Evento de teclado
   */
  const manejarTeclado = (evento) => {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault()
      activarSubidaImagen()
    }
  }

  return (
    <SeccionFormulario 
      titulo={etiquetas.titulo} 
      icono={User} 
      abiertoPorDefecto
    >
      <div className="space-y-3">
        {/* Nombre del plato */}
        <FormInput
          label={etiquetas.nombreComercial}
          value={receta.titulo}
          onChange={(e) => onActualizar('titulo', e.target.value)}
          placeholder={etiquetas.nombrePlaceholder}
          large
        />

        {/* Categoría y dificultad */}
        <div className="grid grid-cols-2 gap-2">
          <FormInput
            label={etiquetas.familia}
            value={receta.categoria}
            onChange={(e) => onActualizar('categoria', e.target.value)}
            placeholder={etiquetas.familiaPlaceholder}
          />
          <FormSelect
            label={etiquetas.dificultad}
            value={receta.dificultad}
            onChange={(e) => onActualizar('dificultad', e.target.value)}
            options={OPCIONES_DIFICULTAD}
          />
        </div>

        {/* Subida de imagen */}
        <div
          className={`image-upload ${receta.imagen ? 'image-upload-active' : ''}`}
          onClick={activarSubidaImagen}
          role="button"
          tabIndex={0}
          onKeyDown={manejarTeclado}
          aria-label={etiquetas.foto}
        >
          {/* Input oculto para archivo */}
          <input
            type="file"
            ref={referenciaInputArchivo}
            className="hidden"
            accept={LIMITES_IMAGEN.tiposPermitidos.join(',')}
            onChange={onSubirImagen}
            aria-hidden="true"
          />
          
          {receta.imagen ? (
            // Vista previa de imagen existente
            <div className="flex items-center gap-3">
              <img
                src={receta.imagen}
                alt="Vista previa"
                className="h-12 w-12 object-cover"
                style={{ borderRadius: '6px', boxShadow: 'var(--shadow-md)' }}
              />
              <span 
                className="text-xs font-semibold"
                style={{ color: 'white' }}
              >
                Cambiar Imagen
              </span>
            </div>
          ) : (
            // Placeholder para subir imagen
            <div 
              className="flex items-center justify-center gap-2"
              style={{ color: 'var(--mokka-sage)' }}
            >
              <Camera size={16} strokeWidth={1.5} aria-hidden="true" />
              <span className="text-xs font-semibold">
                {etiquetas.foto}
              </span>
            </div>
          )}
        </div>
      </div>
    </SeccionFormulario>
  )
}

// Mantener compatibilidad temporal
export const IdentificacionReceta = RecipeIdentification
