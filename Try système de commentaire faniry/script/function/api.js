/**
 * 
 * @param {String} url 
 * @param {Object} options 
 */
export async function fetchJSON(url, options = {}) {
    const headers = {"Accept" : "application/json", ...options.headers}
    const r = await fetch(url, {headers,...options})
    if (!r.ok) {
        throw new Error("Erreur serveur", {cause : e})
    }
    return r.json()
}