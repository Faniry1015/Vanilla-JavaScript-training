
/**
 * Intéragit avec une API JSON
 * @param {string} url 
 * @param {RequestInit} options 
 */
export async function fetchJSON(url, options = {}) {
    const headers = {Accept: "application/json",...options.headers}
    const r = await fetch(url, {headers,...options})
    if (r.ok) {
        return r.json()
    } else {
        throw new Error("Erreur serveur", {cause: r})
    }
}