/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                /**
                 * Paleta MOKKA Tech - Sofisticada, desaturada, fría
                 * Evoca materiales nobles: piedra, hormigón, acero
                 */
                mokka: {
                    // Escala de grises técnicos (de claro a oscuro)
                    sage: '#b1c4c1',      // Gris verdoso claro - Fondos papel
                    steel: '#a7b1b9',     // Gris azulado - Bordes sutiles, paneles secundarios
                    slate: '#7c8b92',     // Gris medio - Texto secundario, iconos inactivos
                    charcoal: '#4b585d',  // Gris oscuro - Texto principal, navegación activa
                    ink: '#2d3639',       // Casi negro - Acento fuerte, fondos Pro
                },
                // Colores de acento funcionales
                accent: {
                    warning: '#d97706',   // Ámbar para advertencias
                    success: '#059669',   // Esmeralda para éxito
                    danger: '#dc2626',    // Rojo para errores
                    info: '#0284c7',      // Azul para información
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            // Border radius técnico: 4px (sm) a 8px (md) - NO burbujas
            borderRadius: {
                'tech-sm': '4px',    // Elementos pequeños: inputs, chips
                'tech': '6px',       // Elementos normales: botones, cards
                'tech-md': '8px',    // Elementos grandes: secciones, modales
            },
            boxShadow: {
                'soft': '0 1px 3px 0 rgb(45 54 57 / 0.1), 0 1px 2px -1px rgb(45 54 57 / 0.1)',
                'medium': '0 4px 6px -1px rgb(45 54 57 / 0.1), 0 2px 4px -2px rgb(45 54 57 / 0.1)',
                'strong': '0 10px 15px -3px rgb(45 54 57 / 0.1), 0 4px 6px -4px rgb(45 54 57 / 0.1)',
                'panel': '4px 0 15px -3px rgb(45 54 57 / 0.15)',
            },
            animation: {
                'fade-in': 'fadeIn 0.2s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
}
