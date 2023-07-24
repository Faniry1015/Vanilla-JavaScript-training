class CreateList {
    items = []
    oldItems = []
    addItem(item) {
        this.items.push(item)
    }

    showItems() {
        this.items.forEach((item) => {
            const checkInput = document.createElement("input")
            checkInput.setAttribute("type", "checkbox")
            checkInput.className = "form-check-input"
            checkInput.setAttribute("id", `todo-${this.items.indexOf(item) + 1}`)

            const checkLabel = document.createElement("label")
            checkLabel.textContent = item.label
            checkLabel.setAttribute("for", `todo-${this.items.indexOf(item) + 1}`)

            const checkLabel2 = document.createElement("label")
            checkLabel2.className = "ms-auto btn btn-danger btn-sm"
            checkLabel2.innerHTML = `
                    <i class="bi-trash">
                    </i>
                `

            const checkLi = document.createElement("li")
            checkLi.className = "todo list-group-item d-flex align-items-center"
            checkLi.append(checkInput, checkLabel, checkLabel2)
            const listGroup = document.querySelector(".list-group")
            listGroup.append(checkLi)
        })
        this.oldItems.push(this.items)
        this.items = this.items.splice(0, -1)
        console.log(this.items)
    }

    removeItem() {
        const delItemLabel = document.querySelectorAll(".bi-trash")
        for (let item of delItemLabel) {
            item.addEventListener("click", (event) => {
                event.preventDefault()
                item.parentElement.parentElement.remove()
            })
        }
    }
}
const mainList = new CreateList()


class ToDoListItem {
    constructor(label) {
        this.label = label
    }
}

const addItemLabel = document.querySelector(".form-control")
const addBtn = document.querySelector(".btn-primary")
addBtn.addEventListener("click", (event) => {
    event.preventDefault()
    const newItem = new ToDoListItem(addItemLabel.value)
    mainList.addItem(newItem)
    mainList.showItems()
    console.log(mainList)
})

function ableRemoveItem() {
    const removeItemLabel = document.querySelectorAll(".bi-trash")
    for (let item of removeItemLabel) {
        item.addEventListener("click", (event) => {
            event.preventDefault()
            item.parentElement.parentElement.remove()
        })
    }
}
ableRemoveItem()

