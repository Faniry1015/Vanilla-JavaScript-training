
export {createElementwithAtt}

/**
 * 
 * @param {String} tagname 
 * @param {String} attName 
 * @param {String} attValue 
 * @returns {HTMLElement}
 */
function createElementwithAtt(tagname, attribute = {}) {
    const element = document.createElement(tagname)
    for (const [key, value] of Object.entries(attribute)) {
        element.setAttribute(key, value)
    }
    return element
}