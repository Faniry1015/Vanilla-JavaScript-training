import {TodoList} from "./app.js"


const todos = JSON.parse(localStorage.getItem("todos"))
const myTodoList = new TodoList(todos)
document.querySelector("#myTodoList").append(myTodoList.appendTodoList())
