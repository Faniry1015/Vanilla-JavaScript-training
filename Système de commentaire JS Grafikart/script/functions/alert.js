/**
 * 
 * @param {String} message 
 * @param {String} type 
 * @return {HTMLElement} 
 */
export function alertElement(message, type = "danger") {
    const el = document.getElementById("alert").content.firstElementChild.cloneNode(true)
    el.classList.add(`alert-${type}`)
    el.querySelector(".js-text").innerText = message
    el.querySelector("button").addEventListener("click",(e) => {
        e.preventDefault()
        el.remove()
        el.dispatchEvent(new CustomEvent("close"))
    })
    return el
}