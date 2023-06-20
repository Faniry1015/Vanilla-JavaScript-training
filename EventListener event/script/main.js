//DIFFERENT EVEMENT
//"click", "scroll"

const myForm = document.querySelector("form")
myForm.addEventListener("submit", (e) => {
    e.preventDefault()  //car par défaut, l'évènement n'apparait que très brièvement dans la console (s'éfface quand c'est réaliser)
    const form = e.currentTarget  //sélectionne le listener
    const data = new FormData(form)
    const firstname = data.get("firstname")           //firstname est le name défini pour la textarea dans le HTML
    console.log(firstname)
})

//"change" evenement lorsqu'on modifie un champ ; ne s'éxécute que lorsqu'on quitte le champ
const myInput = document.querySelector("input")
myInput.addEventListener("change", () => console.log("vous avez changer quelque chose"))

//"input" pour détecter chaque changement (à chaque fois qu'on tape)
myInput.addEventListener("input", (e) => console.log(e.currentTarget.value))

//"keydown" à chaque fois qu'on presse une touche. Peut s'exécuté partout (même dans .document) interressant pour créer des raccourcis clavier sur votre site web
myInput.addEventListener("keydown", (e) => {
    if (e.ctrlKey === true && e.key === "k") {          // raccourci : ctrl + k par défaut se focalise sur la barre d'addresse
        e.preventDefault()
        console.log("raccourci à exécuté")
    }
})

//"keypress" lorsque la touche est maintenu / "keyup" lorsque la touche est relâché

//"focus" lorsqu'un élément à été cliqué / "blur" lorsqu'on quitte le focus

//Pour les checkbox : "change" additionné à .currentTarget.checked : renvoi un booléen
const myCheckbox = document.querySelector("#checkB")
myCheckbox.addEventListener("change", (e) => console.log(e.currentTarget.checked))

//Pour les select
const mySelect = document.querySelector("#famName")
mySelect.addEventListener("change", (e) => console.log(e.currentTarget.value))   //currentTarget.selectedOptions pour selectionné tout l'option pour accéder à tous les autres attributs
 