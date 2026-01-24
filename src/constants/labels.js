/**
 * @fileoverview Etiquetas y textos de la interfaz de usuario.
 * Centraliza todos los textos para facilitar mantenimiento y futuras traducciones.
 * @module constants/labels
 */

/**
 * Etiquetas del formulario organizadas por sección.
 * @constant {Object}
 */
export const ETIQUETAS_FORMULARIO = {
  // Sección de identificación del plato
  identificacion: {
    titulo: 'Identificación del Plato',
    nombreComercial: 'Nombre Comercial',
    nombrePlaceholder: 'Nombre del Plato',
    familia: 'Familia / Categoría',
    familiaPlaceholder: 'Categoría',
    dificultad: 'Dificultad',
    foto: 'Foto del Emplatado',
    subirFoto: 'Subir foto',
    eliminarFoto: 'Eliminar foto',
  },

  // Sección de parámetros de cocina
  parametros: {
    titulo: 'Parámetros de Cocina',
    tiempoPrep: 'Prep (min)',
    tiempoCoccion: 'Cocción (min)',
    raciones: 'Raciones',
    temperatura: 'Temp. Pase',
    caducidad: 'Caducidad',
    coste: 'Coste (EUR)',
    conservacion: 'Conservación',
  },

  // Sección de alérgenos
  alergenos: {
    titulo: 'Alérgenos',
    sinAlergenos: 'Libre de alérgenos mayores',
  },

  // Sección de ingredientes
  ingredientes: {
    titulo: 'Escandallo / Ingredientes',
    placeholder: 'Ingrediente y cantidad...',
    botonAnadir: 'Añadir Línea',
    eliminar: 'Eliminar ingrediente',
  },

  // Sección de pasos de elaboración
  pasos: {
    titulo: 'Pasos de Elaboración',
    placeholder: 'Describe el paso...',
    botonAnadir: 'Añadir Paso',
    eliminar: 'Eliminar paso',
  },

  // Sección de notas
  notas: {
    titulo: 'Notas de Emplatado',
    placeholder: 'Notas del chef, tips de presentación...',
  },
}

/**
 * Etiquetas de la vista previa del documento.
 * @constant {Object}
 */
export const ETIQUETAS_PREVIEW = {
  encabezado: {
    marca: 'MØKKA',
    eslogan: 'real coffee · real food',
    fichaTecnica: 'FICHA TÉCNICA',
  },

  secciones: {
    raciones: 'RACIONES',
    tiempoTotal: 'TIEMPO TOTAL',
    dificultad: 'DIFICULTAD',
    temperatura: 'TEMPERATURA',
    caducidad: 'CADUCIDAD',
    costePorPax: 'COSTE/PAX',
    conservacion: 'CONSERVACIÓN',
    alergenos: 'ALÉRGENOS',
    ingredientes: 'INGREDIENTES',
    procedimiento: 'PROCEDIMIENTO',
    notasEmplatado: 'NOTAS DE EMPLATADO',
  },

  pie: {
    titulo: 'Ficha Técnica Møkka',
    subtitulo: 'Diseñado para profesionales de la hostelería',
  },

  sinFoto: 'SIN FOTO',
  sinDatos: '—',
}

/**
 * Etiquetas de acciones y controles.
 * @constant {Object}
 */
export const ETIQUETAS_ACCIONES = {
  guardar: 'Guardar',
  imprimir: 'Imprimir / PDF',
  limpiar: 'Limpiar',
  cancelar: 'Cancelar',
  confirmar: 'Confirmar',
  zoom: {
    aumentar: 'Aumentar zoom',
    reducir: 'Reducir zoom',
    reiniciar: 'Reiniciar zoom',
  },
}

/**
 * Mensajes de confirmación y alertas.
 * @constant {Object}
 */
export const MENSAJES = {
  confirmarLimpiar: '¿Borrar formulario? Esta acción no se puede deshacer.',
  errorImagen: 'Error al cargar la imagen',
  imagenMuyGrande: 'La imagen es demasiado grande. Máximo permitido:',
  tipoNoPermitido: 'Tipo de archivo no permitido. Use: JPG, PNG o WebP',
}

/**
 * Textos de accesibilidad (aria-labels).
 * @constant {Object}
 */
export const ARIA_LABELS = {
  formulario: 'Formulario de ficha técnica de receta',
  vistaPrevia: 'Vista previa del documento A4',
  seccionColapsable: 'Sección colapsable',
  botonExpandir: 'Expandir sección',
  botonColapsar: 'Colapsar sección',
  inputImagen: 'Seleccionar imagen del plato',
  listaIngredientes: 'Lista de ingredientes',
  listaPasos: 'Lista de pasos de elaboración',
  listaAlergenos: 'Lista de alérgenos presentes',
  controlesZoom: 'Controles de zoom de la vista previa',
}
