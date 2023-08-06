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
        const todoListTemp = cloneTemplate("todolistTemp").firstElementChild
        element.appendChild(todoListTemp)

        this.#todos.forEach(todo => {
            const item = new TodolistItem(todo)
            const tasksDiv = document.getElementById("tasksDiv")
            tasksDiv.append(item)
        })

        const form = document.getElementById("form")
        form.addEventListener("submit", (e) => {
            const t= Date.now()
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

        return itemDiv
    }
}