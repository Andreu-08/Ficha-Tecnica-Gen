import { Sliders, RotateCcw, FileDown, ChefHat } from 'lucide-react'
import { RecipeIdentification } from './recipe-form/RecipeIdentification'
import { RecipeParameters } from './recipe-form/RecipeParameters'
import { RecipeAllergens } from './recipe-form/RecipeAllergens'
import { RecipeIngredients } from './recipe-form/RecipeIngredients'
import { RecipeSteps } from './recipe-form/RecipeSteps'
import { RecipeNotes } from './recipe-form/RecipeNotes'
import { ETIQUETAS_ACCIONES, ARIA_LABELS } from '../constants'

/** Ruta al logo de Mokka */
const RUTA_LOGO = '/Logo_mokka.png'

/**
 * FormularioReceta - Componente principal del formulario (panel lateral izquierdo).
 * Estructura: Cabecera (fija) + Contenido (scrollable) + Pie (fijo)
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.receta - Estado actual de la receta
 * @param {Function} props.onActualizar - Manejador para actualizar campos
 * @param {Function} props.onReiniciar - Manejador para reiniciar formulario
 * @param {Object} props.referenciaInputArchivo - Ref del input de archivo
 * @param {Function} props.onSubirImagen - Manejador de subida de imagen
 * @param {Function} props.manejarCambioArray - Manejador de cambios en arrays
 * @param {Function} props.anadirElementoArray - Manejador para añadir a arrays
 * @param {Function} props.eliminarElementoArray - Manejador para eliminar de arrays
 * @param {Function} props.alternarAlergeno - Manejador para toggle de alérgenos
 * @param {Function} props.onImprimir - Manejador de impresión
 */
export function RecipeForm({
  receta,
  onActualizar,
  onReiniciar,
  referenciaInputArchivo,
  onSubirImagen,
  manejarCambioArray,
  anadirElementoArray,
  eliminarElementoArray,
  alternarAlergeno,
  onImprimir,
}) {
  return (
    <aside 
      className="form-panel no-print" 
      aria-label={ARIA_LABELS.formulario}
    >
      {/* ========================================
          Cabecera - Fija
          ======================================== */}
      <header className="form-header">
        <div className="flex items-center gap-3">
          {/* Icono del generador - Sombrero de chef */}
          <div 
            className="flex h-9 w-9 items-center justify-center"
            style={{ 
              background: 'rgba(177, 196, 193, 0.25)',
              borderRadius: '6px'
            }}
          >
            <ChefHat 
              className="text-white" 
              size={20} 
              strokeWidth={2}
              aria-hidden="true" 
            />
          </div>
          
          {/* Título y subtítulo */}
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white">
              Generador de Fichas
            </h1>
            <p 
              className="text-[10px] uppercase tracking-wider"
              style={{ color: 'var(--mokka-slate)' }}
            >
              Técnica Culinaria
            </p>
          </div>
        </div>

        {/* Botón de reiniciar */}
        <div className="flex gap-2">
          <button
            onClick={onReiniciar}
            className="flex h-8 w-8 items-center justify-center transition-all
                       focus:outline-none focus:ring-2 focus:ring-white/30"
            style={{
              background: 'rgba(177, 196, 193, 0.1)',
              borderRadius: '6px',
              color: 'var(--mokka-steel)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(177, 196, 193, 0.2)'
              e.currentTarget.style.color = 'var(--mokka-sage)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(177, 196, 193, 0.1)'
              e.currentTarget.style.color = 'var(--mokka-steel)'
            }}
            title={ETIQUETAS_ACCIONES.limpiar}
            type="button"
            aria-label={ETIQUETAS_ACCIONES.limpiar}
          >
            <RotateCcw size={14} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ========================================
          Contenido - Scrollable
          ======================================== */}
      <div className="form-content">
        {/* Identificación del plato */}
        <RecipeIdentification
          receta={receta}
          onActualizar={onActualizar}
          referenciaInputArchivo={referenciaInputArchivo}
          onSubirImagen={onSubirImagen}
        />

        {/* Parámetros de cocina */}
        <RecipeParameters 
          receta={receta} 
          onActualizar={onActualizar} 
        />

        {/* Alérgenos */}
        <RecipeAllergens
          alergenosSeleccionados={receta.alergenos}
          onAlternar={alternarAlergeno}
        />

        {/* Ingredientes */}
        <RecipeIngredients
          ingredientes={receta.ingredientes}
          onCambiar={manejarCambioArray}
          onAnadir={anadirElementoArray}
          onEliminar={eliminarElementoArray}
        />

        {/* Pasos de elaboración */}
        <RecipeSteps
          pasos={receta.pasos}
          onCambiar={manejarCambioArray}
          onAnadir={anadirElementoArray}
          onEliminar={eliminarElementoArray}
        />

        {/* Notas del chef */}
        <RecipeNotes 
          notas={receta.notas} 
          onCambiar={onActualizar} 
        />
      </div>

      {/* ========================================
          Pie de página - Fijo
          ======================================== */}
      <footer className="form-footer">
        {/* Logo y etiqueta */}
        <div className="flex items-center gap-3">
          <span 
            className="text-[9px] uppercase tracking-widest font-medium"
            style={{ color: 'var(--mokka-sage)' }}
          >
            Ficha A4
          </span>
        </div>

        {/* Botón de imprimir - Solo visible en móvil */}
        <button
          onClick={onImprimir}
          className="btn-primary py-2 text-xs md:hidden"
          type="button"
        >
          <FileDown size={14} strokeWidth={1.5} aria-hidden="true" /> 
          PDF
        </button>
      </footer>
    </aside>
  )
}

// Mantener compatibilidad temporal
export const FormularioReceta = RecipeForm
