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
            e.preventDefault()
            this.#addTask()
        })

        this.#elementList.addEventListener("delete", ({ detail: todo }) => {
            this.#todos = this.#todos.filter((task) => task !== todo)
            this.#onUpdate()
        })

        this.#elementList.addEventListener("toggle", ({detail: todo}) => {
            todo.completed = !todo.completed
            this.#onUpdate()
        })

    }

    #addTask() {
        const t = Date.now()
        const form = document.getElementById("form")
        const title = new FormData(form).get("newtodo")
        console.log(title)
        const newTodo = {
            id: t,
            title: title,
            completed: false,
        }
        const newItem = new TodolistItem(newTodo)

        this.#todos.push(newTodo)
        this.#elementList.append(newItem.element)
        this.#onUpdate
    }

    #onUpdate() {
        localStorage.setItem("myTasks", JSON.stringify(this.#todos))
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

        deleteBtn.addEventListener("click", () => this.#removeItem())
        checkbox.addEventListener("change", () => this.#toggleCheck(checkbox))

    }

    get element() {
        return this.#element
    }

    #removeItem() {
        const event = new CustomEvent("delete", {
            detail: this.#todo,
            bubbles: true,
            cancelable: true,
        })
        this.#element.dispatchEvent(event)
        this.#element.remove()
    }

    #toggleCheck(checkbox) {
        if (checkbox.checked) {
            this.#element.classList.add("checked")
        } else {
            this.#element.classList.remove("checked")
        }
        const event = new CustomEvent("toggle", {
            detail: this.#todo,
            bubbles: true,
            cancelable: true
        })
        this.#element.dispatchEvent(event)
    }
}