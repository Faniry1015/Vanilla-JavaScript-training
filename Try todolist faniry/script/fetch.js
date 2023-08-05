export async function fetchJSON(url, options) {
    try {
        const headers = {
            Accept:"application/json",
            ...options.headers
        }
        const r = await fetch(url, {...headers, options})
        if (r.ok) {
            return r.json()
        } else {
            throw new Error("Erreur serveur")
        }
    } catch(e) {
        console.log("Erreur de connexion au serveur / ", e)
    }

    
}
