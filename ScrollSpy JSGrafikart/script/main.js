const ratio = 0.6
const spies = document.querySelectorAll("[data-spy]")

let observer = null

/**
 * @param {HTMLElement} element 
 */
const activate = function (element) {
    const id = element.getAttribute("id")
    const anchor = document.querySelector(`a[href="#${id}"]`)
    if (anchor === null) {
        return null
    }

    anchor.parentElement.parentElement
        .querySelectorAll(".active")
        .forEach(node => {
            node.classList.remove("active")
        })
    anchor.classList.add("active")
}

/**
 * @param {IntersectionObserverEntry[]} entries 
 */
const callback = function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            activate(entry.target)
        }
    })
}

/**
 * 
 * @param {NodeListOf.<Element>} elements 
 */
const observe = function (elements) {
    if (observer !== null) {
        elements.forEach(element => observer.unobserve(element))
    }
    const y = Math.round(window.innerHeight = ratio)
    observer = new IntersectionObserver(callback, {
        rootMargin: `${-(window.innerHeight - y - 1)}px 0px ${-y}px 0px` // en lecture seule donc ne se met pas à jour quand on redimmentionne la fenêtre
    })
    spies.forEach(elem => observer.observe(elem)) 
}

/**
 * Permet de ne pas appelé la fonction trop de fois (ex: listener "resize")
 * @param {Function} callback 
 * @param {Number} delay 
 * @returns {Function}
 */
const debounce = function (callback, delay){
    let timer;
    return function(){
        let args = arguments;
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(function(){
            callback.apply(context, args);
        }, delay)
    }
}

if (spies.length > 0) {
    observe(spies)
    window.addEventListener("resize", debounce(function() {
        if (window.innerHeight !== windowH) {
            observe(spies)
            windowH = window.innerHeight
        }
    }), 500)
}