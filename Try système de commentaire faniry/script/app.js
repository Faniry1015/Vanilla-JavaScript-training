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
    /**@param {Number} */
    #page = 1
    /**@param {Boolean} */
    #loading = false

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
        if (this.#loading) {
            return
        }
        this.#loading = true
        const url = new URL (this.#url)
        url.searchParams.set("_limit", 5)
        url.searchParams.set("_page", this.#page)
        try {
            const comments = await fetchJSON(url)
            if (comments.length === 0) {
                this.#observer.disconnect()
                this.#loader.remove()
                return
            }
            for (const element of comments) {
                const commentDiv = this.#template.content.firstElementChild.cloneNode(true)
                for (const [key, selector] of Object.entries(this.#elements)) {
                    commentDiv.querySelector(selector).innerText = element[key]
                }
                this.#target.append(commentDiv)  
            }
            this.#page++ 
            this.#loading = false
        } catch (e) {
            const alert = document.querySelector("#alert")
            "Erreur serveur", {cause: e}
        }
    }
}

document
    .querySelectorAll(".js-infinit-pagination")
    .forEach((el) => new InfinitePagination(el))