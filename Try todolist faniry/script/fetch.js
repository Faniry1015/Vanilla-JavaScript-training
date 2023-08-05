export async function fetchJSON() {
    try {
        const r = await fetch("https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5")
        if (r.ok) {
            return r.json()
        } else {
            throw new Error("Erreur serveur")
        }
    } catch(e) {
        console.log("Erreur de connexion au serveur / ", e)
    }

    
}
