//parametre event pour voir les évènements qui ce sont passés
// event.target : l'élément cliqué ; event.currentTarget: le listener)
/**
 * 
 * @param {PointerEvent} event 
 */
function onButtonClick(event) {
    console.log(event.currentTarget, event.target)
    event.stopPropagation()             //stopPropagation()
    pOnce.innerText = "Je ne m'exécute qu'une seule fois grace à once dans .addEventListener"
}
const pOnce = document.querySelector(".pOnce")
const allButton = document.querySelectorAll("button")
allButton.forEach(button => {
    button.addEventListener("click", onButtonClick, {once: true})   //Once : true signifie que l'action ne peut s'éxécuté plus d'une fois pour chaque boutton
})
/*
stopPropagation : si des éléments imbriqués (ex : <div><button>content</button></div>) ont chacun un .addEventListener avec le même appel (ex: click). l'appel se propage aux éléments parents.  stopPropagation permet de  stoppés cette propagation 
*/
const divEvent = document.querySelector("#stopProg")
divEvent.addEventListener("click", () => {
    divEvent.classList.toggle("red")
}
)

//empêcher le comportement par défaut .preventDefault() ; ici empêche de rediriger vers le lien pour <a>
const grafikartLink = document.querySelector(".gLink")
function stopDefault(event) {
    event.preventDefault()
}
grafikartLink.addEventListener("click", stopDefault)

/*Listener passive cad n'appelera jamais le preventDefault() : améliore les performances sur les évènements qui sont souvent appellés
certains navigateur font passive: true par défaut alors il faut le mettre à false pour pouvoir utiliser preventDefault()*/
document.addEventListener("scroll", (e) => {
    e.preventDefault()
}, {
    passive: false   //true entrainnera une erreur
})

// {capture: true} dans le conteneur parent pour inverser la propagation (cad deviens parent => enfant)

//tous les listeners d'un élément du DOM peuvent être trouver dans la console du navigateur