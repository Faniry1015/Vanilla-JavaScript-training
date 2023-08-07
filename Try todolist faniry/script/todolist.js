import { cloneTemplate, createElement } from "./dom.js"


console.log()


export class Todolist {

    #todos = []

    /** @type {HTMLUlElement} */
    #elementList = []

    constructor(todos) {
        this.#todos = todos
    }

    /**
     * @param {HTMLElement} element 
     */
    appendTo(element) {
        const todoListTemp = cloneTemplate("todolistTemp").firstElementChild
        element.appendChild(todoListTemp)

        this.#todos.forEach(todo => {
            const item = new TodolistItem(todo)
            this.#elementList = document.getElementById("tasksDiv")
            this.#elementList.append(item.element)
        })

        const form = document.getElementById("form")
        form.addEventListener("submit", (e) => {
            const t = Date.now()
            e.preventDefault()
            const newLabel = new FormData(form).get("newtodo")
            const newTask = {
                id: t,
                title: newLabel,
                completed: false,
            }

            const newAddTask = new TodolistItem(newTask)
            const tasksDiv = document.getElementById("tasksDiv")
            tasksDiv.append(newAddTask)

            this.#todos.push(newTask)
        })

        this.#elementList.addEventListener("delete", ({ detail: todo }) => {
            this.#todos = this.#todos.filter((task) => task !== todo)
        })

    }

    addTask() {
        const addBtn = document.getElementById("addBtn")
        addBtn.addEventListener("click", (e) => {
            e.preventDefault()
            const title = new FormData(document.getElementById("form"))
            console.log(title)
        })
    }

    onUpdate() {

    }
}

export class TodolistItem {
    #todo = {}
    #element = []

    #t = Date.now()

    /**
     * @param {string} todo 
     */
    constructor(todo) {
        this.#todo = todo

        this.#element = document.getElementById("itemTemp").content.cloneNode(true).firstElementChild
        const checkbox = this.#element.querySelector("input")
        const label = this.#element.querySelector("label")
        const deleteBtn = this.#element.querySelector("button")

        checkbox.setAttribute("id", this.#t)
        if (this.#todo.completed) {
            checkbox.setAttribute("checked", "")
        }

        label.innerText = this.#todo.title
        label.setAttribute("for", this.#t)

        deleteBtn.addEventListener("click", () => {
            this.removeItem()
        })


    }

    get element() {
        return this.#element
    }

    removeItem() {
        const event = new CustomEvent("delete", {
            detail: this.#todo,
            bubbles: true,
            cancelable: true,
        })
        this.#element.dispatchEvent(event)
        this.#element.remove()
    }

 
}