async function fetchUsers() {
    const r = await fetch("https://jsonplaceholder.typicode.com/users", {
        headers : {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET",
        body: JSON.stringify({title: "Mon premier article"})
    })
    if (r.ok === true) {
        return r.json()
    }
    throw new Error("Erreur serveur")
}

fetchUsers()
    .then(console.log)