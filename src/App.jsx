import { Component } from 'react'
import MokkaFichaGen from './MokkaFichaGen'

/**
 * LimiteError - Componente que captura errores de renderizado en la aplicación.
 * Implementa el patrón Error Boundary de React para manejar errores graciosamente.
 * 
 * @class
 * @extends {Component}
 */
class LimiteError extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      tieneError: false, 
      error: null, 
      infoError: null 
    }
  }

  /**
   * Actualiza el estado cuando se captura un error.
   * @param {Error} error - Error capturado
   * @returns {Object} Nuevo estado
   */
  static getDerivedStateFromError(error) {
    return { tieneError: true, error }
  }

  /**
   * Registra información del error para debugging.
   * @param {Error} error - Error capturado
   * @param {Object} infoError - Información adicional del error
   */
  componentDidCatch(error, infoError) {
    console.error('Error capturado por LimiteError:', error)
    console.error('Información del componente:', infoError.componentStack)
    this.setState({ infoError })
  }

  /**
   * Reinicia el estado de error para permitir reintento.
   */
  reintentar = () => {
    this.setState({ tieneError: false, error: null, infoError: null })
  }

  render() {
    const { tieneError, error } = this.state
    const { children } = this.props

    // Mostrar UI de error si algo falló
    if (tieneError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-50 p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
            {/* Icono de error */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>

            {/* Mensaje de error */}
            <h1 className="text-xl font-bold text-brand-900 mb-2">
              ¡Algo salió mal!
            </h1>
            <p className="text-brand-600 mb-4">
              Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
            </p>

            {/* Detalles del error (solo en desarrollo) */}
            {process.env.NODE_ENV === 'development' && error && (
              <details className="mb-4 text-left">
                <summary className="cursor-pointer text-sm text-brand-500 hover:text-brand-700">
                  Ver detalles del error
                </summary>
                <pre className="mt-2 p-3 bg-brand-100 rounded text-xs text-red-700 overflow-auto">
                  {error.toString()}
                </pre>
              </details>
            )}

            {/* Botones de acción */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.reintentar}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 
                           transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                Reintentar
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-brand-200 text-brand-700 rounded-lg hover:bg-brand-300 
                           transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                Recargar página
              </button>
            </div>
          </div>
        </div>
      )
    }

    return children
  }
}

/**
 * App - Componente raíz de la aplicación.
 * Envuelve la aplicación principal con un límite de errores.
 */
function App() {
  return (
    <LimiteError>
      <MokkaFichaGen />
    </LimiteError>
  )
}

export default App
