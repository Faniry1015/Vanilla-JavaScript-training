import { cloneTemplate, createElement } from "./dom.js"


console.log()


export class Todolist {

    #todos = []

    constructor(todos) {
        this.#todos = todos
    }

    /**
     * @param {HTMLElement} element 
     */
    appendTo(element) {
        const form = cloneTemplate("todolistTemp").firstElementChild
        element.appendChild(form)

        this.#todos.forEach(todo => {
            const item = new TodolistItem(todo)
            const tasksDiv = document.getElementById("tasksDiv")
            tasksDiv.append(item)
        });
    }

    addTask() {
        const addBtn = document.getElementById("addBtn")
        addBtn.addEventListener("click", (e) => {
            e.preventDefault()
            const title = new FormData(document.getElementById("form"))
            console.log(title)
        })
    }
}

export class TodolistItem {
    #todo = {}

    #t = Date.now()

    /**
     * @param {string} todo 
     */
    constructor(todo) {
        this.#todo = todo

        const itemDiv = document.getElementById("itemTemp").content.cloneNode(true).firstElementChild
        const checkbox = itemDiv.querySelector("input")
        const label = itemDiv.querySelector("label")
        const deleteBtn = itemDiv.querySelector("button")

        checkbox.setAttribute("id", this.#t)
        if (this.#todo.completed) {
            checkbox.setAttribute("checked","")
        }

        label.innerText = this.#todo.title
        label.setAttribute("for", this.#t)

        deleteBtn.addEventListener("click", (e) => {
            e.currentTarget.parentNode.remove()
        })


        console.log(checkbox)
        console.log(label)

        return itemDiv
    }
}