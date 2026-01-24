/**
 * @fileoverview Reglas de validación y límites del sistema.
 * Centraliza configuración para facilitar ajustes sin modificar lógica.
 * @module constants/validation
 */

/**
 * Límites para imágenes subidas.
 * @constant {Object}
 */
export const LIMITES_IMAGEN = {
  /** Tamaño máximo en bytes (50MB) */
  tamanoMaximo: 50 * 1024 * 1024,
  
  /** Tamaño máximo legible para mostrar al usuario */
  tamanoMaximoTexto: '50MB',
  
  /** Tipos MIME permitidos */
  tiposPermitidos: ['image/jpeg', 'image/png', 'image/webp'],
  
  /** Extensiones permitidas para mostrar al usuario */
  extensionesTexto: 'JPG, PNG, WebP',
}

/**
 * Límites para listas dinámicas.
 * @constant {Object}
 */
export const LIMITES_LISTAS = {
  /** Máximo de ingredientes por receta */
  maxIngredientes: 30,
  
  /** Máximo de pasos de elaboración */
  maxPasos: 20,
  
  /** Mínimo de ingredientes para mostrar */
  minIngredientes: 1,
  
  /** Mínimo de pasos para mostrar */
  minPasos: 1,
}

/**
 * Límites para campos de texto.
 * @constant {Object}
 */
export const LIMITES_TEXTO = {
  /** Longitud máxima del nombre del plato */
  maxNombrePlato: 100,
  
  /** Longitud máxima de categoría */
  maxCategoria: 50,
  
  /** Longitud máxima de cada ingrediente */
  maxIngrediente: 200,
  
  /** Longitud máxima de cada paso */
  maxPaso: 500,
  
  /** Longitud máxima de notas */
  maxNotas: 1000,
}

/**
 * Configuración del zoom de la vista previa.
 * @constant {Object}
 */
export const CONFIG_ZOOM = {
  /** Zoom mínimo permitido (50%) */
  minimo: 0.5,
  
  /** Zoom máximo permitido (150%) */
  maximo: 1.5,
  
  /** Incremento/decremento por paso */
  paso: 0.1,
  
  /** Zoom inicial (100%) */
  inicial: 1,
}

/**
 * Dimensiones del documento A4 en píxeles (a 96 DPI).
 * @constant {Object}
 */
export const DIMENSIONES_A4 = {
  /** Ancho en píxeles */
  ancho: 794,
  
  /** Alto en píxeles */
  alto: 1123,
  
  /** Ancho en mm */
  anchoMm: 210,
  
  /** Alto en mm */
  altoMm: 297,
}

/**
 * Clave para almacenamiento en localStorage.
 * @constant {string}
 */
export const CLAVE_STORAGE = 'mokka-recipe-form'
