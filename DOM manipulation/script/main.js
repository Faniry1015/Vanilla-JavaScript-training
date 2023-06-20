const firstLi  = document.querySelector("ul li:first-child") // PAS FORCEMENT document. pour querySelector("")
firstLi.setAttribute("hidden", "hidden")  // Créer un attribut "hidden"
firstLi.removeAttribute("hidden")  // Enlever l'attribut
console.log(firstLi.getAttribute("class"))  // Trouver la valeur de l'attribut. Nul si n'existe pas 

// .classList
console.log(firstLi.classList.remove("red"))  //classList a plusieurs méthodes interessantes
firstLi.classList.add("weird")              //ajoute une class weird

setInterval(()=> {                      //faire clignoté l'élément
    firstLi.classList.toggle("red")        // l'efface si existe et l'ajoute si n'existe pas
}, 2000)

// style : permet d'ajouter des propriétés CSS. mais utiliser "Camel case : backgroundColor" et non les tirets
const secondLi  = document.querySelector("ul li:nth-child(2)")
secondLi.style.fontWeight = "bold"
console.log(getComputedStyle(secondLi).fontWeight)  // Pour trouver la valeur de l'attribut style

// Création et Ajout d'un élément HTML (dans un noeud: .appendChild())
// Ajout d'élément à partir de n'importe quel élément Html : .append() (RECOMMANDE) ; on peut ajouter directement du texte
const newLi = document.createElement("li")
newLi.innerHTML = "Je suis la nouvelle composante de liste JS"
document.querySelector("ul").appendChild(newLi)  //prepend pour le mettre au début
// On ne peut pas mettre un élément à plusieurs endroits. Faut le copier

// Ajouter à n'importe quel position 
const myUl = document.querySelector("ul")
const myDiv = document.createElement("div")
myDiv.textContent = "Je suis la nouvelle div JS"
myUl.insertAdjacentElement("beforebegin", myDiv)
// Préférer .append() pour les choses à l'intérieure de l'élément
// <!-- beforebegin -->
// <p>
//   <!-- afterbegin -->
//   foo
//   <!-- beforeend -->
// </p>
// <!-- afterend -->

// HTMLCollection des éléments enfants ; à l'inverse du .querySelector(), il est dynamique (ex: si on supprime un élément du DOM à partir du navigateur, elle est également supprimer dans children)
window.a = myUl.children

console.log(
    myUl.childNodes,            //Affiche les noeuds enfants (text)
    myUl.firstElementChild,     //Premier element enfant
    myUl.children.length
)

// Cloner et placer des éléments
const myLi = document.querySelector("li")
myUl.append(myLi.cloneNode(true))  // Si pas de paramètre "true", seul l'élément est copié (pas le texte (valeur))








