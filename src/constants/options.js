/**
 * @fileoverview Opciones para selectores y listas predefinidas.
 * Centraliza datos de UI para fácil mantenimiento.
 * @module constants/options
 */

/**
 * Opciones de unidades de medida para ingredientes.
 * @constant {Array<{valor: string, etiqueta: string}>}
 */
export const OPCIONES_UNIDADES = [
  { valor: 'g', etiqueta: 'g' },
  { valor: 'kg', etiqueta: 'kg' },
  { valor: 'ml', etiqueta: 'ml' },
  { valor: 'l', etiqueta: 'l' },
  { valor: 'u', etiqueta: 'u' },
  { valor: 'ud.', etiqueta: 'ud.' },
  { valor: 'mg', etiqueta: 'mg' },
  { valor: 'c.s.', etiqueta: 'c.s.' },
  { valor: 'c/n', etiqueta: 'c/n' },
]

/**
 * Opciones de dificultad de la receta.
 * @constant {Array<{valor: string, etiqueta: string}>}
 */
export const OPCIONES_DIFICULTAD = [
  { valor: 'Baja', etiqueta: 'Baja' },
  { valor: 'Media', etiqueta: 'Media' },
  { valor: 'Alta', etiqueta: 'Alta' },
  { valor: 'Crítica', etiqueta: 'Crítica' },
]

/**
 * Opciones de temperatura de pase.
 * @constant {Array<{valor: string, etiqueta: string}>}
 */
export const OPCIONES_TEMPERATURA = [
  { valor: 'Ambiente', etiqueta: 'Ambiente' },
  { valor: 'Fría (4-8°C)', etiqueta: 'Fría (4-8°C)' },
  { valor: 'Caliente (65°C+)', etiqueta: 'Caliente (65°C+)' },
  { valor: 'Templada (15-20°C)', etiqueta: 'Templada (15-20°C)' },
]

/**
 * Opciones de método de conservación.
 * @constant {Array<{valor: string, etiqueta: string}>}
 */
export const OPCIONES_CONSERVACION = [
  { valor: 'Refrigeración', etiqueta: 'Refrigeración' },
  { valor: 'Congelación', etiqueta: 'Congelación' },
  { valor: 'Temperatura ambiente', etiqueta: 'Temperatura ambiente' },
  { valor: 'Vacío', etiqueta: 'Vacío' },
  { valor: 'Atmósfera modificada', etiqueta: 'Atmósfera modificada' },
]

/**
 * Lista de alérgenos según Reglamento (UE) nº 1169/2011.
 * Incluye los 14 alérgenos de declaración obligatoria.
 * @constant {Array<{id: string, numero: number, nombre: string, icono: string, descripcion: string}>}
 */
export const LISTA_ALERGENOS = [
  { 
    id: 'gluten', 
    numero: 1,
    nombre: 'Gluten', 
    icono: '🌾', 
    descripcion: 'Cereales con gluten (trigo, centeno, cebada, avena, espelta, kamut)' 
  },
  { 
    id: 'crustaceos', 
    numero: 2,
    nombre: 'Crustáceos', 
    icono: '🦞', 
    descripcion: 'Crustáceos y productos a base de crustáceos' 
  },
  { 
    id: 'huevos', 
    numero: 3,
    nombre: 'Huevos', 
    icono: '🥚', 
    descripcion: 'Huevos y productos a base de huevo' 
  },
  { 
    id: 'pescado', 
    numero: 4,
    nombre: 'Pescado', 
    icono: '🐟', 
    descripcion: 'Pescado y productos a base de pescado' 
  },
  { 
    id: 'cacahuetes', 
    numero: 5,
    nombre: 'Cacahuetes', 
    icono: '🥜', 
    descripcion: 'Cacahuetes y productos a base de cacahuetes' 
  },
  { 
    id: 'soja', 
    numero: 6,
    nombre: 'Soja', 
    icono: '🫘', 
    descripcion: 'Soja y productos a base de soja' 
  },
  { 
    id: 'lacteos', 
    numero: 7,
    nombre: 'Lácteos', 
    icono: '🥛', 
    descripcion: 'Leche y derivados (incluida la lactosa)' 
  },
  { 
    id: 'frutos-cascara', 
    numero: 8,
    nombre: 'Frutos de Cáscara', 
    icono: '🌰', 
    descripcion: 'Almendras, avellanas, nueces, anacardos, pacanas, nueces de Brasil, pistachos, macadamia' 
  },
  { 
    id: 'apio', 
    numero: 9,
    nombre: 'Apio', 
    icono: '🥬', 
    descripcion: 'Apio y productos derivados' 
  },
  { 
    id: 'mostaza', 
    numero: 10,
    nombre: 'Mostaza', 
    icono: '🌶️', 
    descripcion: 'Mostaza y productos derivados' 
  },
  { 
    id: 'sesamo', 
    numero: 11,
    nombre: 'Sésamo', 
    icono: '⚪', 
    descripcion: 'Granos de sésamo y productos a base de sésamo' 
  },
  { 
    id: 'sulfitos', 
    numero: 12,
    nombre: 'Sulfitos', 
    icono: '🧪', 
    descripcion: 'Dióxido de azufre y sulfitos (>10 mg/kg o 10 mg/l en SO₂)' 
  },
  { 
    id: 'altramuces', 
    numero: 13,
    nombre: 'Altramuces', 
    icono: '🌿', 
    descripcion: 'Altramuces y productos a base de altramuces' 
  },
  { 
    id: 'moluscos', 
    numero: 14,
    nombre: 'Moluscos', 
    icono: '🦪', 
    descripcion: 'Moluscos y productos a base de moluscos' 
  },
]

/**
 * Opciones de caducidad predefinidas.
 * @constant {Array<string>}
 */
export const OPCIONES_CADUCIDAD = [
  '24h',
  '48h',
  '72h',
  '1 semana',
  '2 semanas',
  '1 mes',
  '3 meses',
  '6 meses',
]

/**
 * Familias/categorías de platos predefinidas.
 * @constant {Array<string>}
 */
export const CATEGORIAS_PLATO = [
  'Entrantes',
  'Ensaladas',
  'Sopas y Cremas',
  'Carnes',
  'Pescados',
  'Arroces',
  'Pastas',
  'Postres',
  'Panadería',
  'Bebidas',
  'Salsas',
  'Guarniciones',
]
