import { useState, useId } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * SeccionFormulario - Sección colapsable del formulario con icono y título.
 * Implementa patrón de acordeón accesible.
 * Estilo técnico con iconos de trazo fino (strokeWidth: 1.5)
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.titulo - Título de la sección
 * @param {Component} props.icono - Componente de icono Lucide
 * @param {ReactNode} props.children - Contenido de la sección
 * @param {boolean} [props.abiertoPorDefecto=false] - Si inicia expandida
 */
export function SeccionFormulario({ titulo, icono: Icono, children, abiertoPorDefecto = false }) {
  const [estaAbierta, setEstaAbierta] = useState(abiertoPorDefecto)
  
  // IDs únicos para accesibilidad
  const headerId = useId()
  const panelId = useId()

  const toggleSeccion = () => setEstaAbierta(!estaAbierta)

  return (
    <div className="form-section">
      {/* Encabezado clickeable */}
      <button
        id={headerId}
        onClick={toggleSeccion}
        className="section-header"
        type="button"
        aria-expanded={estaAbierta}
        aria-controls={panelId}
      >
        <div className="section-title">
          <Icono 
            size={14} 
            strokeWidth={1.5}
            style={{ color: 'var(--mokka-sage)' }} 
            aria-hidden="true" 
          />
          <span>{titulo}</span>
        </div>
        
        {/* Indicador de expansión */}
        <div 
          className={`transition-transform duration-200 ${estaAbierta ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <ChevronDown 
            size={14} 
            strokeWidth={1.5}
            style={{ color: 'var(--mokka-slate)' }} 
          />
        </div>
      </button>
      
      {/* Panel de contenido */}
      {estaAbierta && (
        <div 
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          className="section-content"
        >
          {children}
        </div>
      )}
    </div>
  )
}

// Mantener compatibilidad temporal (deprecado)
/** @deprecated Usar SeccionFormulario */
export const FormSection = SeccionFormulario
