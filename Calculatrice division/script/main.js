
let  myResultat
function operation() {
    const numerateur = document.querySelector(".num")
    const denominateur = document.querySelector(".denom")
    
    const myNum = parseFloat(prompt("Numérateur ?"))
    const myDenom = parseFloat(prompt("Dénominateur ?"))
    
    numerateur.innerText = myNum
    denominateur.innerText = myDenom
 
    return myResultat = myNum / myDenom
}

function showResult() {
    const result = document.querySelector(".result")
    result.innerText = myResultat
}

const myInit = document.querySelector("#initCal")
myInit.addEventListener("click", () => operation())

const myResultButton = document.querySelector("#myResult")
myResultButton.addEventListener("click", () => showResult())