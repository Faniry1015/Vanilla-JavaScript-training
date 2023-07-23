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
        for (let user of users) {
            const body = document.querySelector("body")
            const section = document.createElement("section")
            const id = document.createElement("h2")
            const name = document.createElement("p")
            const email = document.createElement("a")
        
            id.innerText = user.id
            name.innerText = user.name
            email.innerText = user.email
        
            body.appendChild(section)
            section.appendChild(id)
            section.appendChild(name)
            section.appendChild(email)
        }
    } else {
        throw new Error("Erreur serveur")
    }

}

fetchUsers()



