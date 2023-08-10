
/**
 * Intéragit avec une API JSON
 * @param {string} url 
 * @param {RequestInit & {json: Object}} options 
 */
export async function fetchJSON(url, options = {}) {
    const headers = {Accept: "application/json",...options.headers}
    if (options.json) {
        options.body = JSON.stringify(options.json)
        headers["Content-Type"] = "application/json"
    }
    const r = await fetch(url, {headers,...options})
    if (r.ok) {
        return r.json()
    } else {
        throw new Error("Erreur serveur", {cause: r})
    }
}