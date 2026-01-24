import { useEffect, useState, useCallback } from 'react'
import { ESTADO_INICIAL_RECETA, CLAVE_ALMACENAMIENTO } from '../constants'

/**
 * Hook personalizado para gestionar el estado de la receta con persistencia en localStorage.
 * Implementa patrón de separación de responsabilidades: solo maneja persistencia, no UI.
 * 
 * @param {Object} opciones - Opciones de configuración
 * @param {Function} [opciones.onConfirmarReset] - Callback para confirmar reset (por defecto usa confirm nativo)
 * @returns {Object} Estado de la receta y funciones de actualización
 */
export function useRecipeStorage(opciones = {}) {
  const { onConfirmarReset } = opciones

  // Inicializar estado desde localStorage si existe
  const [receta, setReceta] = useState(() => {
    const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO)
    if (!guardado) return ESTADO_INICIAL_RECETA

    try {
      const parseado = JSON.parse(guardado)
      // Excluir imagen de localStorage (demasiado grande)
      const { imagen, ...resto } = parseado
      return { ...ESTADO_INICIAL_RECETA, ...resto }
    } catch (error) {
      console.error('Error al cargar receta del almacenamiento:', error)
      return ESTADO_INICIAL_RECETA
    }
  })

  // Guardar en localStorage cuando cambia la receta
  useEffect(() => {
    const { imagen, ...resto } = receta
    try {
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(resto))
    } catch (error) {
      console.error('Error al guardar receta en almacenamiento:', error)
    }
  }, [receta])

  /**
   * Actualiza un campo individual de la receta.
   * @param {string} campo - Nombre del campo a actualizar
   * @param {*} valor - Nuevo valor para el campo
   */
  const actualizarCampo = useCallback((campo, valor) => {
    setReceta((prev) => ({ ...prev, [campo]: valor }))
  }, [])

  /**
   * Reinicia la receta al estado inicial y limpia localStorage.
   * Usa callback de confirmación si se proporciona, sino confirm nativo.
   */
  const reiniciarReceta = useCallback(() => {
    // Usar callback personalizado o confirm nativo por defecto
    const confirmar = onConfirmarReset || (() => 
      window.confirm('¿Borrar formulario? Se perderán los datos actuales.')
    )

    if (confirmar()) {
      setReceta(ESTADO_INICIAL_RECETA)
      localStorage.removeItem(CLAVE_ALMACENAMIENTO)
    }
  }, [onConfirmarReset])

  /**
   * Reinicia la receta sin confirmación (uso interno).
   */
  const reiniciarSinConfirmar = useCallback(() => {
    setReceta(ESTADO_INICIAL_RECETA)
    localStorage.removeItem(CLAVE_ALMACENAMIENTO)
  }, [])

  return {
    receta,
    setReceta,
    actualizarCampo,
    reiniciarReceta,
    reiniciarSinConfirmar,
    // Mantener compatibilidad temporal (deprecado)
    recipe: receta,
    updateField: actualizarCampo,
    resetRecipe: reiniciarReceta,
  }
}
