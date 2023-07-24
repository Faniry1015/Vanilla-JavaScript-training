class CreateList {
    items = []
    addItem(item) {
        this.items.push(item)
    }

    showItems() {
        this.items.forEach((item) => {
            const checkInput = document.createElement("input")
            checkInput.setAttribute("type", "checkbox")
            checkInput.className = "form-check-input"

            const checkLabel = document.createElement("label")
            checkLabel.textContent = item.label

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
    }
}
const mainList = new CreateList()


class ToDoListItem {
    constructor(label) {
        this.label = label
    }

    deleteItem() {
        delete this
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

