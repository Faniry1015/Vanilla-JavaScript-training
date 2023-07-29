import { fetchJSON } from "./functions/api.js";
import { createElement } from "./functions/dom.js";
import { TodoList } from "./component/Todolist.js";

try {
const todos = await fetchJSON("https://jsonplaceholder.typicode.com/todos?_limit=5")
const list = new TodoList(todos)
list.appendTo(document.querySelector("#todolist"))
} catch (e) {
    const alertElement = createElement("div", {
        class:"alert alert-danger m-2", 
        role: "alert"
    })
    alertElement.innerText = "Impossible de charger les éléments"
    document.body.prepend(alertElement)
}


