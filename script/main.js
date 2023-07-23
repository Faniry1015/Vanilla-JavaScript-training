function createElementWithContent (tagname, content) {
    let element = document.createElement(tagname)
    element.innerText = content
    return element
}

function createSection (user) {
    let sect = document.createElement("section")
    sect.appendChild(createElementWithContent("h2", user.id))
    sect.appendChild(createElementWithContent("p", user.name))
    sect.appendChild(createElementWithContent("p", user.email))
    return sect
}

async function fetchUsers() {
    const r = await fetch("https://jsonplaceholder.typicode.com/users", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET",
    })
    if (r.ok === true) {
        let users = await r.json()

        const body = document.querySelector("body")
        for (let user of users) {
            body.append(createSection(user))
        }
    } else {
        throw new Error("Erreur serveur")
    }
}

fetchUsers()



