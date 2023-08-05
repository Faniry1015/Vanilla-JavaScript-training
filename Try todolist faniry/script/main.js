import { fetchJSON } from "./fetch.js";
import { Todolist, TodolistItem } from "./todolist.js";

async function myTodoList() {
    const r = await fetchJSON("https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5")

    const todos = r
    const list = new Todolist(todos)

    const todolistDiv = document.getElementById("todolistDiv")
    list.appendTo(todolistDiv)
    todos.forEach(todo => {
        const item = new TodolistItem(todo)
        const tasksDiv = document.getElementById("tasksDiv") 
        tasksDiv.append(item)
    });
    
}

myTodoList()
