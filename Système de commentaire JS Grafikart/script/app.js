import { fetchJSON } from "./functions/api.js"
import { alertElement } from "./functions/alert.js"

class InfinitePagination {

    /**@type {string} */
    #endpoint
    /**@type {HTMLTemplateElement} */
    #template
    /**@type {HTMLElement} */
    #target
    /**@type {Object} */
    #loader
    /**@type {Object} */
    #elements
    /**@type {IntersectionObserver} */
    #observer
    /**@type {Boolean} */
    #loading = false
    /**@type {Number} */
    #page = 1

    /**
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.#loader = element
        this.#endpoint = element.dataset.endpoint
        this.#template = document.querySelector(element.dataset.template)
        this.#target = document.querySelector(element.dataset.target)
        this.#elements = JSON.parse(element.dataset.elements)
        this.#observer = new IntersectionObserver((entries) => {
            for (let entry of entries) {
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
        try {
            const url = new URL(this.#endpoint)
            url.searchParams.set("_limit", 5)
            url.searchParams.set("_page", this.#page)
            console.log(url.toString())
            const comments = await fetchJSON(url.toString())
            if (comments.length === 0) {
                 this.#observer.disconnect()
                 this.#loader.remove()
                 return
            }
            for (const comment of comments) {
                const commentElement = this.#template.content.cloneNode(true)
                for (const [key, selector] of Object.entries(this.#elements)) {
                    commentElement.querySelector(selector).innerText = comment[key]
                }
                this.#target.append(commentElement)
            }
            this.#page++
            this.#loading = false
        } catch(e) {
            this.#loader.style.display = "none"
            const error = alertElement("Impossible de charger les contenus")
            error.addEventListener("close", () => {
                this.#loader.style.removeProperty("display")
                this.#loading = false
            })
            this.#target.append(error)
        }

    }

}

document
    .querySelectorAll(".js-infinite-pagination")
    .forEach(el => new InfinitePagination(el))
