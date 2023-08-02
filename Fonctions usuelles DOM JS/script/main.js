//Récupérer la positionnement d'un élément
const h1 = document.querySelector("h1")
console.log(h1.getBoundingClientRect()) //positionnement de l'élément par rapport à la fenêtre (change quand on défile dans la fenêtre)

console.log(h1.offsetTop) // par rapport au parent relatif (ici au top du document, mais devient le conteneur si il est en position:relative)  (également: .offsetHeight, Width et Left) // CF contexte d'empilement dans la DOCUMENTATION 
console.log(h1.offsetParent)  // affiche le parent relatif (body ou le conteneur si il est en position relative)

const scroll = window.scrollY // position du scroll par rapport au top de la page

//Récupérer la position de l'élément par rapport au top de la page (problème est que window.scrollY calcul les demis pixels)
const h1Position = window.scrollY + h1.getBoundingClientRect().y
console.log(h1Position)

//Utilisant le récursive offset (additionnant la position par rapport aux parents successives)
/**
 * position de l'élément par rapport au top de la page
 * @param {HTMLElement} element 
 * @return {Number}  
 */
function recursiveOffsetTop(element) {
    let top = 0
    while (element.offsetParent) {
        top += element.offsetTop
        element = element.offsetParent
    }
    return top
}
console.log("Position par rapport au haut", recursiveOffsetTop(h1))

//Ou encore
function recursiveOffsetTop2(element) {
    if (element.offsetParent) {
        return element.offsetTop + recursiveOffsetTop2(element.offsetParent)
    } else {
        return element.offsetTop
    }
}
console.log("Position par rapport au haut 2 : ", recursiveOffsetTop2(h1))

//positionnement de la mouse par rapport à la page 
// document.body.addEventListener("mousemove", (e) => console.log(e.pageX, e.pageY)) //également offsetX et Y par rapport à la fenêtre

//attribut data-nomAtribut="valeur" dans le HTML : propriété particèlière qui ne sera jamais écraser par ce qui est standard dans le JS
const dataDiv = document.querySelector(".bonjour")
console.log(dataDiv.dataset) // return un DOMStringMap
dataDiv.dataset.myAttribut = "new Data"
console.log(dataDiv.dataset)
console.log(dataDiv.dataset.user)

//removeEventListener pour supprimer un listener
const button = document.querySelector("button")
let i = 0
const listener = () => {
    i++
    console.log(button.dataset.value)
    if (i >= 3) {
        button.removeEventListener("click", listener)
    }
}
button.addEventListener("click", listener)

//animations
button.animate([
    //animations ({} dans un [])
    { transform: "translateY(0)" },  //Position de départ pas obligatoire (prend les propriétés css qui sont par défaut sur l'élément)
    {
        transform: "translateY(-100px)",
        rotate: "360deg"
    },    //animations
], {
    //temporalités listés dans un {}
    duration: 1000,
    iterations: 5,      // valeur Infinity : nombre qui représente l'infinit
    fill: "both"        //position finale à la fin de l'animation
})

//Détecter le redimentionnement de la fenêtre
// window.addEventListener("resize",() => console.log(window.innerHeight)) //Pas très performante car beaucoup de calcul
//Plus performant
const mediaQuery = window.matchMedia("(min-height:300px")
mediaQuery.addEventListener("change", () => console.log(mediaQuery.matches))


//Images
//Récupérer largeur d'une image
const image = document.querySelector("img") 
console.log(image.width) //risque : pourrais retourné 0 si la connexion est lente (image pas encore chargé au moment de l'exécution du script)
//Utilisé load() (attend que l'image se charge) 
image.addEventListener("load", () => {
    console.log("largeur <img>:", image.width) //Attention: pas la taille réelle mais la taille de la balise img
    console.log("largeur réelle image:",image.naturalWidth) //taille réelle de l'image
})

