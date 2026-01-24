/**
 * Handle printing the recipe sheet
 * @param {Object} recipe - Recipe data
 */
export function handlePrint(recipe) {
    const originalTitle = document.title
    const recipeTitle = recipe?.titulo || 'Receta'
    const cleanTitle = recipeTitle.replace(/[^a-zA-Z0-9]/g, '_')
    document.title = `Ficha_${cleanTitle}`
    window.print()
    document.title = originalTitle
}

/**
 * Generate a clean filename from a recipe title
 * @param {string} title - Recipe title
 * @returns {string} Clean filename
 */
export function generateFilename(title) {
    return (title || 'Receta').replace(/[^a-zA-Z0-9]/g, '_')
}
