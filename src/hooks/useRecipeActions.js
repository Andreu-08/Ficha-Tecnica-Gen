import { useCallback } from 'react'
import { LIMITES_LISTAS } from '../constants'

/**
 * Hook personalizado para gestionar acciones de arrays (ingredientes, pasos) y alérgenos.
 * Implementa patrón de composición con funciones puras memorizadas.
 * 
 * @param {Object} receta - Estado actual de la receta
 * @param {Function} setReceta - Setter del estado de la receta
 * @returns {Object} Manejadores de acciones
 */
export function useRecipeActions(receta, setReceta) {
  /**
   * Actualiza un elemento en un campo de tipo array.
   * @param {string} tipo - Nombre del campo array (ingredientes o pasos)
   * @param {number} indice - Índice del elemento a actualizar
   * @param {string|Object} valor - Nuevo valor (string para pasos, objeto para ingredientes)
   */
  const manejarCambioArray = useCallback((tipo, indice, valor) => {
    setReceta((prev) => {
      const nuevoArray = [...prev[tipo]]
      nuevoArray[indice] = valor
      return { ...prev, [tipo]: nuevoArray }
    })
  }, [setReceta])

  /**
   * Añade un nuevo elemento vacío a un campo de tipo array.
   * Respeta los límites configurados en LIMITES_LISTAS.
   * @param {string} tipo - Nombre del campo array (ingredientes o pasos)
   * @returns {boolean} True si se añadió, false si alcanzó el límite
   */
  const anadirElementoArray = useCallback((tipo) => {
    const limite = tipo === 'ingredientes' 
      ? LIMITES_LISTAS.maxIngredientes 
      : LIMITES_LISTAS.maxPasos

    setReceta((prev) => {
      if (prev[tipo].length >= limite) {
        console.warn(`Límite de ${limite} ${tipo} alcanzado`)
        return prev
      }
      
      // Para ingredientes, crear un objeto con cantidad, unidad y nombre
      const nuevoElemento = tipo === 'ingredientes' 
        ? { cantidad: '', unidad: 'g', nombre: '' }
        : ''
      
      return { ...prev, [tipo]: [...prev[tipo], nuevoElemento] }
    })
  }, [setReceta])

  /**
   * Elimina un elemento de un campo de tipo array.
   * Mantiene al menos un elemento vacío.
   * @param {string} tipo - Nombre del campo array (ingredientes o pasos)
   * @param {number} indice - Índice del elemento a eliminar
   */
  const eliminarElementoArray = useCallback((tipo, indice) => {
    setReceta((prev) => {
      const minimo = tipo === 'ingredientes' 
        ? LIMITES_LISTAS.minIngredientes 
        : LIMITES_LISTAS.minPasos

      // No permitir eliminar si solo queda el mínimo
      if (prev[tipo].length <= minimo) {
        return prev
      }

      return {
        ...prev,
        [tipo]: prev[tipo].filter((_, i) => i !== indice),
      }
    })
  }, [setReceta])

  /**
   * Alterna la selección de un alérgeno.
   * @param {string} id - ID del alérgeno a alternar
   */
  const alternarAlergeno = useCallback((id) => {
    setReceta((prev) => {
      const existe = prev.alergenos.includes(id)
      return {
        ...prev,
        alergenos: existe
          ? prev.alergenos.filter((item) => item !== id)
          : [...prev.alergenos, id],
      }
    })
  }, [setReceta])

  return {
    manejarCambioArray,
    anadirElementoArray,
    eliminarElementoArray,
    alternarAlergeno,
    // Mantener compatibilidad temporal (deprecado)
    handleArrayChange: manejarCambioArray,
    addArrayItem: anadirElementoArray,
    removeArrayItem: eliminarElementoArray,
    toggleAllergen: alternarAlergeno,
  }
}
