
// .then(r => r.json()). then(body => console.log(body))

async function asyncFetch() {
    const r = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        }
    })
    if (r.ok === true) {
        return r.json()
    } else {
        throw new Error("Erreur")
    }
}

const x = asyncFetch().then(r => console.log(r)).then(console.log(x[0]))

