/**
 * Créer un paragraphe à partir d'un objet
 * @param {Object} post 
 * @returns {string}
 */
function createArticle(post) {
    const article = document.createElement("article")
    article.innerHTML = `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    `
    return article
}

async function main() {
        const loader = document.createElement("p")
        loader.textContent = "Chargement du contenu JSON ..."

        const wrapper = document.querySelector("#LastPosts")
        wrapper.append(loader)
    try {
        const r = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
            headers: {
                Accept: "application/json",
            },
            method: "GET"
        })

        if (!r.ok) {
            throw new Error("Impossible de charger le fichier JSON")
        }

        loader.remove()
        const posts = await r.json()
    
        for (let post of posts) {
            wrapper.append(createArticle(post))
        }

    } catch (e) {
        loader.textContent = "Impossible d'accéder au serveur"
        loader.style.color = "red"
        return
    }
}

main()

