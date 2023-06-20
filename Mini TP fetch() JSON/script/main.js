function createArticle(post) {
    const article = document.createElement("article")
    article.append(createElementWithText("h2", post.title))
    article.append(createElementWithText("p", post.body))
// Rapide mais pas sécurisé si quelqu'un entre du code à risque dans title et body du JSON 
    // article.innerHTML = `
    // <h2>${post.title}</h2>
    // <p>${post.body}</p>
    // `
    return article
}

//Pour la méthode sécurisé, on a besoin de cette methode
function createElementWithText(tagname, content) {
    const element = document.createElement(tagname)
    element.innerText = content
    return element
}

async function main() {
    const loader = document.createElement("p")
loader.innerText = "Chargement..."

const wrapper = document.querySelector("#lastPosts")
wrapper.append(loader)

try {
    const r = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", 
    {
        headers: {
            Accept: "application/json"
        },
        method: "GET"
    })

    loader.remove()
    const posts = await r.json()
    console.log(posts)

    for (let post of posts) {
        wrapper.append(createArticle(post))
    }
    } 
catch (e) {
    loader.innerText = "Erreur de chargement"
    loader.style.color = "red"
    return
    }
}

main()


