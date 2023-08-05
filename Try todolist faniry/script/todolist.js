import { createElement } from "./dom.js"


export class todolist {
    constructor(todos) {
        this.#todos = todos
    }
}

export class todolistItem {
    /**
     * @param {string} todo 
     */
    constructor(todo) {
        this.#todo = todo

        createElement("div", {id:""})    
    }
}