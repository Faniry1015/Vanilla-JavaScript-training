import { createElementwithAtt } from "./dom.js";

export class TodoList {

    #itemsObj = []
    #todoListElement
    #itemsList

    /**
     * 
     * @param {Todos[Object]} todos 
     */
    constructor(todos) {
        this.todos = todos
    }

    appendTodoList() {
        this.#todoListElement = document.querySelector("#todoListTemplate").content.firstElementChild
        this.#itemsList = this.#todoListElement.querySelector("#items-list")

        if (this.todos) {
            this.todos.forEach(todo => {
                this.#itemsObj.push(todo)
                const itemElement = new TodoListItem(todo)
                this.#itemsList.append(itemElement.createElement())
            });
        }


        const formAdd = this.#todoListElement.querySelector("#form-add")
        formAdd.addEventListener("submit", (e) => {
            e.preventDefault()  
            const data = formAdd.querySelector("#name")  
            this.#onSubmit(data.value)
            data.value=""
            this.#onChange()
        })

        this.#todoListElement.addEventListener("onRemoveItem", ({detail : deletedTodo}) => {
            this.#itemsObj = this.#itemsObj.filter((todo) => todo !== deletedTodo)
            this.#onChange()
        })

        this.#todoListElement.addEventListener("toggle", ({detail: changedTodo}) => {
            this.#itemsObj.map((element) => {
                if (element === changedTodo)
                element.done = !changedTodo.done
            })
            this.#onChange()
        }) 

        return this.#todoListElement
    }

    /**
     * 
     * @param {String} e 
     */
    #onSubmit(e) {
        const itemObj = {
            id : Date.now(),
            name: e,
            done: false
        }
        this.#itemsObj.push(itemObj)
        const itemElement = new TodoListItem(itemObj)
        this.#itemsList.append(itemElement.createElement())
    }

    #onChange() {
        localStorage.setItem("todos", JSON.stringify(this.#itemsObj))
    }
} 

export class TodoListItem {
    #item
    #element

    constructor(item) {
        this.#item = item

    }

    createElement() {
        this.#element = createElementwithAtt("li", {class: "form-label form-group"})
        const checkbox = createElementwithAtt("input", {type: "checkbox", class:"form-checkbox" })
        if (this.#item.done) {
            checkbox.setAttribute("checked", "")
            checkbox.classList.add("done")
        }
        const btnRemove = createElementwithAtt("button", {class: "btn-remove btn btn-secondary"})
        btnRemove.innerText = "Supprimer"
        this.#element.innerText = this.#item.name
        this.#element.prepend(checkbox)
        this.#element.append(btnRemove)

        btnRemove.addEventListener("click", () => {
            this.#removeItem(this.#element)
        } )

        checkbox.addEventListener("change", (e) => {
            this.#toggle(e.target)
        })
        return this.#element
    }   

    #removeItem() {
        const event = new CustomEvent("onRemoveItem", {
            detail: this.#item,
            bubbles: true
        })
        this.#element.dispatchEvent(event)  
        this.#element.remove()
    }

    #toggle(element) {
        const event = new CustomEvent("toggle", {
            detail: this.#item,
            bubbles: true
        })
        element.dispatchEvent(event)
        if (element.classList.contains("done")) {
            element.removeAttribute("checked")
        }
        element.classList.toggle("done")       
    }
}