import { fetchJSON } from "./function/api.js";
import { alert } from "./function/alert.js";

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
        const url = new URL(this.#url)
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
            this.#loader.style.display = "none"
            const erreur = await alert("Erreur de chargement des commentaires", "myError")
            this.#target.insertAdjacentElement("beforeBegin", erreur)
            erreur.addEventListener("close", () => {
                this.#loader.style.removeProperty("display")
                this.#loading = false
            })
        }
    }
}

class fetchForm {

    /** @param {String} */
    #endpoint
    /** @param {HTMLTemplateElement} */
    #template
    /** @param {HTMLElement} */
    #target
    /** @param {Object} */
    #elements

    /**
     * 
     * @param {HTMLFormElement} form 
     */
    constructor(form) {
        this.#endpoint = form.dataset.url
        this.#template = document.querySelector(form.dataset.template)
        this.#target = document.querySelector(form.dataset.target)
        this.#elements = JSON.parse(form.dataset.elements) 

        form.addEventListener("submit", (e) => {
            e.preventDefault()
            this.#addComment(e.currentTarget)
        })
    }

    async #addComment(form) {
        const button = form.querySelector("button")
        button.setAttribute("disabled","")
        const data = new FormData(form)
        try {
            const comment = await fetchJSON(this.#endpoint, {
                method: "POST",
                json: Object.fromEntries(data)
            })
            const commentDiv = this.#template.content.firstElementChild.cloneNode(true)
            for (const [key, selector] of Object.entries(this.#elements)) {
                commentDiv.querySelector(selector).innerText = comment[key]
            }
            this.#target.prepend(commentDiv)
            form.reset()
            button.removeAttribute("disabled")
        } catch(e) {
            const erreur = await alert("Erreur de chargement du commentaire", "myError")
            this.#target.insertAdjacentElement("beforebegin", erreur)
            erreur.addEventListener("close", () => {
                button.removeAttribute("disabled")
            })
        }
    }
}

document
    .querySelectorAll(".js-infinit-pagination")
    .forEach((el) => new InfinitePagination(el))

document
    .querySelectorAll(".js-form")
    .forEach((el) => new fetchForm(el))