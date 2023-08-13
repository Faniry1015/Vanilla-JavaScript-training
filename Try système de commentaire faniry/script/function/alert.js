
/**
 * 
 * @param {String} message 
 * @param {String} type 
 */
export async function alert(message, type) {

    const alert = document.querySelector("#alertTempl").content.firstElementChild.cloneNode(true)
    const alertContent = alert.querySelector("#alertContent")
    const closeBtn = alert.querySelector("button")
    alert.style.display = "block"
    alert.classList.add(type)

    alertContent.innerText = message
    closeBtn.addEventListener("click", (e) => {
        e.preventDefault()
        alert.remove()
        const event = new CustomEvent("close")
        alert.dispatchEvent(event)
    })
    return alert
}