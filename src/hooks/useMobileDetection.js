import { useState, useEffect } from 'react'

/**
 * Breakpoint móvil (sincronizado con Tailwind md:)
 * Valores menores a este se consideran móvil
 */
const MOBILE_BREAKPOINT = 768

/**
 * useMobileDetection - Hook para detectar si el viewport es móvil.
 * Usa matchMedia para sincronizar con CSS media queries.
 * 
 * @returns {Object} Estado de detección móvil
 * @returns {boolean} isMobile - true si viewport < 768px
 * @returns {boolean} isDesktop - true si viewport >= 768px
 * @returns {number} MOBILE_BREAKPOINT - Valor del breakpoint en px
 * 
 * @example
 * const { isMobile, isDesktop } = useMobileDetection()
 * 
 * if (isMobile) {
 *   return <MobileLayout />
 * }
 * return <DesktopLayout />
 */
export function useMobileDetection() {
    // Lazy initialization - se ejecuta solo una vez al montar
    const [isMobile, setIsMobile] = useState(() => {
        // SSR safety check
        if (typeof window === 'undefined') {
            return false
        }
        return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
    })

    useEffect(() => {
        // SSR safety check
        if (typeof window === 'undefined') {
            return
        }

        // Crear media query
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

        // Handler para cambios en el media query
        const handleChange = (event) => {
            setIsMobile(event.matches)
        }

        // Escuchar cambios (usar addEventListener para compatibilidad moderna)
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange)
        } else {
            // Fallback para navegadores antiguos
            mediaQuery.addListener(handleChange)
        }

        // Cleanup
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange)
            } else {
                mediaQuery.removeListener(handleChange)
            }
        }
    }, [])

    return {
        isMobile,
        isDesktop: !isMobile,
        MOBILE_BREAKPOINT
    }
}

export default useMobileDetection
