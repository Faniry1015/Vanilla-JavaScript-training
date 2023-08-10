/**
 * 
 * @param {String} message 
 * @return {HTMLElement} 
 */
export function alertElement(message) {
    const el = document.getElementById("alert").content.firstElementChild.cloneNode(true)
    el.querySelector(".js-text").innerText = message
    el.querySelector("button").addEventListener("click",(e) => {
        e.preventDefault()
        el.remove()
        el.dispatchEvent(new CustomEvent("close"))
    })
    return el
}