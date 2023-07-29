
/**
 * 
 * @param {string} tagName 
 * @param {object} attributes 
 * @return {HTMLElement} 
 */
export function createElement(tagName, attributes = {}) {
    const element = document.createElement(tagName)
    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value)
    }
    return element
}