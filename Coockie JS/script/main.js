//Récuperer le nom du cookie à partir de la clé

/**
 * 
 * @param {string} name 
 * @return {string|null} 
 */
function getCookie(name) {
    const cookies = document.cookie.split("; ")
    const value = cookies.find(c => c.startsWith(name))
    ?.split("=")[1]
if (value === undefined) {
    return null
}
    return decodeURIComponent(value)
}

console.log(getCookie("https"))


//Créer un cookie avec une date d'expiration
/**
 * 
 * @param {string} name 
 * @param {string} value
 * @param {number} days 
 */
function setCookie(name, value, days) {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date}`
}

//Utilité avec fetch()
fetch("https://jsonplaceholder.typicode.com/users", {
    credentials: "include" //Permet de définir comment vont être envoyé les informations sur l'utilisateurs (cookies et entêtes d'authentifications) par défaut "same-origin" c'est à dire ne l'envoie pas si on change de nom de domaine (include change celà) mais il faut d'autres conditions comme cookies marqués (Secure ; sameSite=none) 
    //Certains noms de domaines n'ont pas été fait pour être contacter depuis l'extérieur ce qui envoie un CORS error dans Network (autre video Grafikart CORS pour configurer le server)
})

console.log(setCookie("faniry", "VALEUR", 1))
 