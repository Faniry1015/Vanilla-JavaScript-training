import { createElement, cloneTemplate } from "../functions/dom.js"

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */
export class TodoList {

    /** @type {Todo[]} */
    #todos = []

    /** @type {HTMLUlElement} */
    #listElement = []

    /** @param {Todo[]} todos */
    constructor(todos) {
        this.#todos = todos
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo(element) {
        element.append(cloneTemplate("todolist-layout"))
        this.#listElement = element.querySelector(".list-group")
        for (let todo of this.#todos) {
            const t = new TodoListItem(todo)
            this.#listElement.append(t.element)
        }
        element.querySelector("form").addEventListener("submit", e => this.#onSubmit(e))
        element.querySelectorAll(".btn-group button").forEach(button => {
            button.addEventListener("click", e => {
                this.#toggleFilter(e)
                this.#onUpdate()
            })
        })

        this.#listElement.addEventListener("delete", ({detail: todo}) => {
            this.#todos = this.#todos.filter(task => task !== todo)
            this.#onUpdate()
        })

        this.#listElement.addEventListener("toggle", ({detail: todo}) => {
            todo.completed = !todo.completed
            this.#onUpdate()
        })
    }

    /**
    * @param {SubmitEvent} e
    */
    #onSubmit(e) {
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(form).get("title").toString().trim()
        if (title === "") {
            return
        }
        const todo = {
            id: Date.now(),
            title,
            completed: false
        }
        const item = new TodoListItem(todo)
        this.#listElement.prepend(item.element)
        form.reset()

        this.#todos.push(todo)
        this.#onUpdate()
    }

    #onUpdate() {
        localStorage.setItem("todos", JSON.stringify(this.#todos))
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #toggleFilter(e) {
        e.preventDefault()
        const currentBtn = e.currentTarget
        const filter = currentBtn.getAttribute("data-filter")
        currentBtn.parentElement.querySelector(".active").classList.remove("active")
        currentBtn.classList.add("active")
        if (filter === "todo") {
            this.#listElement.classList.add("hide-completed")
            this.#listElement.classList.remove("hide-todo")
        } else if (filter === "done") {
            this.#listElement.classList.add("hide-todo")
            this.#listElement.classList.remove("hide-completed")
        } else {
            this.#listElement.classList.remove("hide-completed")
            this.#listElement.classList.remove("hide-todo")
        }
    }

}


class TodoListItem {

    #element
    #todo

    /**
     * @param {Todo} todo 
     */
    constructor(todo) {

        const id = `todo-${Date.now()}`
        const li = cloneTemplate("todolist-item").firstElementChild

        this.#todo = todo
        this.#element = li
        const checkbox = li.querySelector("input")
        checkbox.setAttribute("id", id)
        if (todo.completed) {
            checkbox.setAttribute("checked", "")
        }
        const label = li.querySelector("label")
        label.setAttribute("for", id)
        label.innerText = todo.title
        const button = li.querySelector("button")

        this.toggle(checkbox)

        button.addEventListener("click", e => this.remove(e))
        checkbox.addEventListener("change", e => this.toggle(e.currentTarget))

    }

    /**
     * @return {HTMLElement}
     */
    get element() {
        return this.#element
    }

    /**
     * @param {PointEvent} e 
     */
    remove(e) {
        e.preventDefault()
        const event = new CustomEvent("delete", {
            detail: this.#todo, //Permet récupérer les détails sur l'élément qui a été supprimer dans attribut détail de la console
            bubbles: true, // Permet à l'évènement de se propager (voir documentation) / propriété dispo sur tous les évènements 
            cancelable: true //permet de détérminer si un évènement peut être annulé ou pas / permet d'avoir des informations supplémentaire et d'annuler un évènement grace à un preventDefault() / event.defaultPrevented renvoi un booléen qui permet de savoir si un preventDefault a été utilisé       
        })
        this.#element.dispatchEvent(event)
        if (event.defaultPrevented) {
            return
        }
        this.#element.remove()
    }

    /**
     * Change l'état (à faire / fait) de la tâche
     *
     * @param {HTMLInputElement} checkbox 
     */
    toggle(checkbox) {
        if (checkbox.checked) {
            this.#element.classList.add("is-completed")
        } else {
            this.#element.classList.remove("is-completed")
        }
        const event = new CustomEvent("toggle", {
            detail: this.#todo,
            bubbles: true
        })
        this.#element.dispatchEvent(event)
    }

}