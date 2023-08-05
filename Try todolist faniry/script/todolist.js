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
    }
}

export class TodolistItem {
    #todo = {}

    /**
     * @param {string} todo 
     */
    constructor(todo) {
        this.#todo = todo

        
        
    }
}