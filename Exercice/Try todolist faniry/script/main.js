import { fetchJSON } from "./fetch.js";
import { Todolist } from "./todolist.js";

async function myTodoList() {
    // const r = await fetchJSON("https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5")


    let todos = JSON.parse(localStorage.getItem("myTasks"))
    console.log(todos)

    const list = new Todolist(todos)

    const todolistDiv = document.getElementById("todolistDiv")
    list.appendTo(todolistDiv)
    
}

myTodoList()
