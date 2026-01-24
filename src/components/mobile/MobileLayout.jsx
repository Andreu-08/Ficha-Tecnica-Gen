import { RecipeForm } from '../RecipeForm'

/**
 * MobileLayout - Layout contenedor para modo móvil.
 * Muestra solo el formulario ocupando toda la pantalla.
 * La vista previa se mostrará on-demand mediante modal.
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
 * @param {React.ReactNode} props.children - Componentes hijos (FAB, modals, etc.)
 */
export function MobileLayout({
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
  children
}) {
  return (
    <main className="mobile-container">
      {/* Formulario ocupa todo el viewport en móvil */}
      <RecipeForm
        receta={receta}
        onActualizar={onActualizar}
        onReiniciar={onReiniciar}
        referenciaInputArchivo={referenciaInputArchivo}
        onSubirImagen={onSubirImagen}
        manejarCambioArray={manejarCambioArray}
        anadirElementoArray={anadirElementoArray}
        eliminarElementoArray={eliminarElementoArray}
        alternarAlergeno={alternarAlergeno}
        onImprimir={onImprimir}
      />
      
      {/* Slot para FAB, modals y otros componentes móviles */}
      {children}
    </main>
  )
}

export default MobileLayout
