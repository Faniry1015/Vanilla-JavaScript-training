import { fetchJSON } from "./function/api.js";

class InfinitePagination {

    /**@param {HTMLElement} */
    #loader
    /** @param {string} */
    #url
    /**@param {HTMLElement} */
    #template
    /**@param {HTMLElement} */
    #target
    /** @param {Object} */
    #elements
    /** @param {IntersectionObserver} */
    #observer
    constructor(element) {
        this.#loader = element
        this.#url = element.dataset.url
        this.#template = document.querySelector(element.dataset.template)
        this.#target = document.querySelector(element.dataset.target) 
        this.#elements = JSON.parse(element.dataset.elements) 
        this.#observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    this.#loadMore()
                }
            }
        })
        this.#observer.observe(element)
    }

    async #loadMore() {
        const url = await fetchJSON(this.#url)
        for (const element of url) {
            const commentDiv = this.#template.content.firstElementChild.cloneNode(true)
            for (const [key, selector] of Object.entries(this.#elements)) {
                commentDiv.querySelector(selector).innerText = element[key]
            }
            this.#target.append(commentDiv)  
        }

        
        
    }
}

document
    .querySelectorAll(".js-infinit-pagination")
    .forEach((el) => new InfinitePagination(el))