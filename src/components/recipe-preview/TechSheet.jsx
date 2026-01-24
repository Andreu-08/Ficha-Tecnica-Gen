import { Snowflake, AlertTriangle } from 'lucide-react'
import { LISTA_ALERGENOS_UI } from '../../constants'

/** Ruta al logo de Mokka */
const RUTA_LOGO = '/Logo_mokka.png'
const RUTA_LOGO_WATERMARK = '/logo_moca_o.png'

/**
 * TechSheet - Componente del documento A4 de la ficha técnica.
 * Renderiza solo el contenido del documento sin UI adicional (zoom, botones, etc).
 * Usado tanto en desktop (dentro de RecipePreview) como en móvil (en modal).
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.receta - Datos de la receta
 * @param {string} props.className - Clases adicionales para el contenedor
 * @param {Object} props.style - Estilos inline adicionales
 */
export function TechSheet({ receta, className = '', style = {} }) {
  // Filtrar datos válidos
  const ingredientesValidos = receta.ingredientes?.filter((ing) => {
    if (typeof ing === 'object' && ing !== null) {
      return ing.nombre && ing.nombre.trim()
    }
    return typeof ing === 'string' && ing.trim()
  }) || []
  
  const pasosValidos = receta.pasos?.filter((paso) => paso.trim()) || []

  return (
    <div className={`a4-container ${className}`} style={style}>
      <article className="tech-sheet">
        {/* ========================================
            HEADER - Cabecera con branding
            ======================================== */}
        <header className="tech-sheet-header">
          <div className="tech-sheet-brand">
            <img src={RUTA_LOGO} alt="Mokka" className="tech-sheet-logo" />
          </div>
          <div className="tech-sheet-title-block">
            <h1 className="tech-sheet-title">
              {receta.titulo || 'NOMBRE DEL PLATO'}
            </h1>
            <div className="tech-sheet-category">
              {receta.categoria || 'Categoría'}
            </div>
          </div>
        </header>

        {/* ========================================
            SECCIÓN SUPERIOR - Imagen + Parámetros
            ======================================== */}
        <section className="tech-sheet-top-section">
          {/* Imagen del plato */}
          <div className="tech-sheet-image-container">
            {receta.imagen ? (
              <img
                src={receta.imagen}
                alt={receta.titulo}
                className="tech-sheet-image"
              />
            ) : (
              <div className="tech-sheet-no-image">
                <span>📷</span>
                <span>SIN FOTO</span>
              </div>
            )}
          </div>

          {/* Grid de parámetros */}
          <div className="tech-sheet-params-grid">
            <div className="tech-param-cell">
              <span className="tech-param-label">RACIONES</span>
              <span className="tech-param-value">{receta.raciones || '—'}</span>
            </div>
            <div className="tech-param-cell">
              <span className="tech-param-label">TIEMPO TOTAL</span>
              <span className="tech-param-value">
                {(parseInt(receta.tiempoPreparacion) || 0) + (parseInt(receta.tiempoCoccion) || 0)}'
              </span>
            </div>
            <div className="tech-param-cell">
              <span className="tech-param-label">DIFICULTAD</span>
              <span className="tech-param-value tech-param-bold">{receta.dificultad || 'Media'}</span>
            </div>

            <div className="tech-param-cell">
              <span className="tech-param-label">TEMPERATURA</span>
              <span className="tech-param-value tech-param-bold">{receta.temperatura || 'Caliente'}</span>
            </div>
            <div className="tech-param-cell">
              <span className="tech-param-label">CADUCIDAD</span>
              <span className="tech-param-value">{receta.caducidad || '24h'}</span>
            </div>
            <div className="tech-param-cell">
              <span className="tech-param-label">COSTE PAX</span>
              <span className="tech-param-value tech-param-highlight">
                {receta.coste ? `${receta.coste}€` : '0.00€'}
              </span>
            </div>
          </div>

          {/* Alérgenos */}
          <div className="tech-allergens-inline">
            <div className="tech-allergens-header">
              <AlertTriangle size={14} strokeWidth={1.5} />
              <span>ALÉRGENOS</span>
            </div>
            <div className="tech-allergens-chips">
              {receta.alergenos?.length > 0 ? (
                LISTA_ALERGENOS_UI
                  .filter(a => receta.alergenos.includes(a.id))
                  .map(alergeno => {
                    const Icono = alergeno.icon
                    return (
                      <span key={alergeno.id} className="tech-allergen-chip-full">
                        <Icono size={12} strokeWidth={1.5} />
                        {alergeno.label}
                      </span>
                    )
                  })
              ) : (
                <span className="tech-allergen-none">Sin alérgenos declarados</span>
              )}
            </div>
          </div>

          {/* Método de conservación */}
          <div className="tech-conservation">
            <div className="tech-conservation-header">
              <Snowflake size={14} strokeWidth={1.5} />
              <span>CONSERVACIÓN</span>
            </div>
            <div className="tech-conservation-value">
              {receta.conservacion || 'Refrigeración'}
            </div>
          </div>
        </section>

        {/* ========================================
            SECCIÓN PRINCIPAL - Ingredientes + Procedimiento
            ======================================== */}
        <section className="tech-sheet-main-section">
          {/* Marca de agua del logo */}
          <div className="tech-watermark">
            <img src={RUTA_LOGO_WATERMARK} alt="" className="tech-watermark-logo" />
          </div>

          {/* Columna Ingredientes */}
          <div className="tech-ingredients-column">
            <h2 className="tech-section-title">INGREDIENTES</h2>
            <ul className="tech-ingredients-list">
              {ingredientesValidos.length > 0 ? (
                ingredientesValidos.map((ing, i) => {
                  if (typeof ing === 'object' && ing !== null) {
                    const cantidadUnidad = `${ing.cantidad || ''} ${ing.unidad || ''}`.trim()
                    const nombre = ing.nombre || ''
                    return (
                      <li key={i} className="tech-ingredient-item">
                        <span className="tech-ingredient-qty">{cantidadUnidad || '—'}</span>
                        <span className="tech-ingredient-name">{nombre}</span>
                      </li>
                    )
                  }
                  return (
                    <li key={i} className="tech-ingredient-item">
                      <span className="tech-ingredient-name" style={{ paddingLeft: 0 }}>{ing}</span>
                    </li>
                  )
                })
              ) : (
                <li className="tech-ingredient-item tech-empty">Sin ingredientes</li>
              )}
            </ul>
          </div>

          {/* Columna Procedimiento */}
          <div className="tech-procedure-column">
            <h2 className="tech-section-title">ELABORACIÓN</h2>
            <ol className="tech-procedure-list">
              {pasosValidos.length > 0 ? (
                pasosValidos.map((paso, i) => (
                  <li key={i} className="tech-procedure-item">
                    <span className="tech-procedure-number">{i + 1}</span>
                    <span className="tech-procedure-text">{paso}</span>
                  </li>
                ))
              ) : (
                <li className="tech-procedure-item tech-empty">Sin pasos definidos</li>
              )}
            </ol>

            {/* Notas del Chef */}
            {receta.notas && (
              <div className="tech-notes">
                <h3 className="tech-notes-title">NOTAS DEL CHEF</h3>
                <p className="tech-notes-content">{receta.notas}</p>
              </div>
            )}
          </div>
        </section>

        {/* ========================================
            FOOTER - Pie de página
            ======================================== */}
        <footer className="tech-sheet-footer">
          <div className="tech-footer-brand">
            <img src={RUTA_LOGO_WATERMARK} alt="Mokka" className="tech-footer-logo" />
            <span>Carrer Riu Volga, 7, 12005 Castelló de la Plana</span>
          </div>
          <span className="tech-footer-brand">
            FICHA TÉCNICA
          </span>
        </footer>
      </article>
    </div>
  )
}

export default TechSheet
