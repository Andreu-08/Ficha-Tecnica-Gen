/**
 * @fileoverview Archivo principal de constantes y exportaciones centralizadas.
 * Re-exporta todas las constantes desde sus módulos específicos.
 * @module constants
 */

import { 
  Wheat,        // 1. Gluten (cereales)
  Shell,        // 2. Crustáceos (Shell = concha/marisco)
  Egg,          // 3. Huevos
  Fish,         // 4. Pescado
  Nut,          // 5. Cacahuetes
  Bean,         // 6. Soja
  Milk,         // 7. Lácteos
  TreeDeciduous,// 8. Frutos de cáscara (alternativa a nueces)
  Leaf,         // 9. Apio
  Droplets,     // 10. Mostaza (gotas de salsa)
  Circle,       // 11. Sésamo (semillas redondas)
  FlaskConical, // 12. Sulfitos (químico)
  Sprout,       // 13. Altramuces
  CircleDot,    // 14. Moluscos
} from 'lucide-react'

// Re-exportar todas las constantes de módulos específicos
export * from './labels.js'
export * from './validation.js'
export * from './options.js'

/**
 * Lista de alérgenos con iconos Lucide para UI.
 * Según Reglamento (UE) nº 1169/2011 - 14 alérgenos obligatorios.
 * @constant {Array<{id: string, numero: number, label: string, icon: Component, descripcion: string}>}
 */
export const LISTA_ALERGENOS_UI = [
  { id: 'gluten', numero: 1, label: 'Gluten', icon: Wheat, descripcion: 'Cereales con gluten' },
  { id: 'crustaceos', numero: 2, label: 'Crustáceos', icon: Shell, descripcion: 'Crustáceos' },
  { id: 'huevos', numero: 3, label: 'Huevos', icon: Egg, descripcion: 'Huevos' },
  { id: 'pescado', numero: 4, label: 'Pescado', icon: Fish, descripcion: 'Pescado' },
  { id: 'cacahuetes', numero: 5, label: 'Cacahuetes', icon: Nut, descripcion: 'Cacahuetes' },
  { id: 'soja', numero: 6, label: 'Soja', icon: Bean, descripcion: 'Soja' },
  { id: 'lacteos', numero: 7, label: 'Lácteos', icon: Milk, descripcion: 'Leche y lactosa' },
  { id: 'frutos-cascara', numero: 8, label: 'Frutos Cáscara', icon: TreeDeciduous, descripcion: 'Frutos de cáscara' },
  { id: 'apio', numero: 9, label: 'Apio', icon: Leaf, descripcion: 'Apio' },
  { id: 'mostaza', numero: 10, label: 'Mostaza', icon: Droplets, descripcion: 'Mostaza' },
  { id: 'sesamo', numero: 11, label: 'Sésamo', icon: Circle, descripcion: 'Sésamo' },
  { id: 'sulfitos', numero: 12, label: 'Sulfitos', icon: FlaskConical, descripcion: 'SO₂ y sulfitos' },
  { id: 'altramuces', numero: 13, label: 'Altramuces', icon: Sprout, descripcion: 'Altramuces' },
  { id: 'moluscos', numero: 14, label: 'Moluscos', icon: CircleDot, descripcion: 'Moluscos' },
]

/**
 * Estado inicial de una receta vacía.
 * @constant {Object}
 */
export const ESTADO_INICIAL_RECETA = {
  titulo: 'Nombre del Plato',
  categoria: 'Categoría',
  imagen: null,
  raciones: '1',
  tiempoPreparacion: '0',
  tiempoCoccion: '0',
  dificultad: 'Media',
  temperatura: 'Ambiente',
  caducidad: '24h',
  conservacion: 'Refrigeración',
  coste: '0.00',
  alergenos: [],
  ingredientes: [{ cantidad: '', unidad: 'g', nombre: '' }],
  pasos: [''],
  notas: '',
}

/**
 * Clave para almacenamiento en localStorage.
 * @constant {string}
 */
export const CLAVE_ALMACENAMIENTO = 'mokka_receta_actual'

// Mantener compatibilidad temporal con nombres antiguos (deprecado)
/** @deprecated Usar LISTA_ALERGENOS_UI */
export const ALLERGENS_LIST = LISTA_ALERGENOS_UI
/** @deprecated Usar ESTADO_INICIAL_RECETA */
export const INITIAL_STATE = ESTADO_INICIAL_RECETA
/** @deprecated Usar CLAVE_ALMACENAMIENTO */
export const STORAGE_KEY = CLAVE_ALMACENAMIENTO
