async function fetchUsers() {
    const r = await fetch("https://jsonplaceholder.typicode.com/users", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET",
        // body: JSON.stringify({title: "Mon premier article"})
    })
    if (r.ok === true) {
        return data = r.json()
    }
    throw new Error("Erreur serveur")
}

let r = fetchUsers()
    .then(console.log)

r.forEach(element => {
    const body = document.querySelector("body")
    const section = document.createElement("section")
    const title = document.createElement("h2")
    const name = document.createElement("p")
    const email = document.createElement("a")

    title.innerText = element.title
    name.innerText = element.name
    name.innerText = element.email

    body.appendChild(section)
    section.appendChild(title)
    section.appendChild(name)
    section.appendChild(email)
})

