import { fetchJSON } from "./fetch.js";
import { todolist, todolistItem } from "./todolist.js";

fetchJSON("https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5")