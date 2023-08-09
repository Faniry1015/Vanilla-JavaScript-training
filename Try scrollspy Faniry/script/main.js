const ratio = 0.6

/**
 * 
 * @param {NodeList} entries 
 */
function callback(entries) {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            const navSections = document.querySelectorAll(".active")
            navSections.forEach((element) => element.classList.remove("active"))
            const id = entry.target.getAttribute("id")
            const active = document.querySelector(`a[href="#${id}"]`)
            active.classList.add("active")
        }
    }
}

function updateObserver() {
    if (windowHeight !== window.innerHeight) {
        initObserver(sections)
        windowHeight = window.innerHeight
    }
}

let windowHeight = window.innerHeight
window.addEventListener("resize", updateObserver)

const sections = document.querySelectorAll(".sect")

/**
 * @param {NodeList} sections 
 */
function initObserver(sections) {
    if (sections.length > 0) {
        const y = window.innerHeight * ratio
        const observer = new IntersectionObserver(callback, {
            rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`
        })
        observer.disconnect
        sections.forEach((section) => {
            observer.observe(section)
        })
    }
}

initObserver(sections)

