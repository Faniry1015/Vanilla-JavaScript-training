const ratio = 0.6
let windowHeight = window.innerHeight
const sections = document.querySelectorAll(".sect")

/**
 * 
 * @param {NodeList} entries 
 */
const callback = function (entries) {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            activate(entry.target)
        }
    }
}

function activate(element) {
    const navSections = document.querySelectorAll(".active")
    navSections.forEach((elem) => elem.classList.remove("active"))
    const id = element.getAttribute("id")
    const active = document.querySelector(`a[href="#${id}"]`)
    active.classList.add("active")
}

function updateObserver() {
    if (windowHeight !== window.innerHeight) {
        initObserver(sections)
        windowHeight = window.innerHeight
    }
}

/**
 * @param {NodeList} sections 
 */
function initObserver(sections) {
    const y = window.innerHeight * ratio
    const observer = new IntersectionObserver(callback, {
        rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`
    })
    sections.forEach((section) => {
        observer.observe(section)
    })
}


if (sections.length > 0) {
    initObserver(sections)
}
window.addEventListener("resize", updateObserver)

