class CreateList {
    items = []
    itemId = 0
    addItem(item) {
        this.item = item
    }

    showNewItem() {
        ++this.itemId

        const checkInput = document.createElement("input")
        checkInput.setAttribute("type", "checkbox")
        checkInput.className = "form-check-input"
        checkInput.setAttribute("id", `todo-${this.itemId}`)

        const checkLabel = document.createElement("label")
        checkLabel.textContent = this.item.label
        checkLabel.setAttribute("for", `todo-${this.itemId}`)

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

        this.items.push(this.item)
        console.log(this.items)
    }

    // removeItem() {
    //     const delItemLabel = document.querySelectorAll(".bi-trash")
    //     for (let item of delItemLabel) {
    //         item.addEventListener("click", (event) => {
    //             event.preventDefault()
    //             item.parentElement.parentElement.remove()
    //         })
    //     }
    // }
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
    mainList.showNewItem()
    console.log(mainList)
})

// function ableRemoveItem() {
//     const removeItemLabel = document.querySelectorAll(".bi-trash")
//     for (let item of removeItemLabel) {
//         item.addEventListener("click", (event) => {
//             event.preventDefault()
//             item.parentElement.parentElement.remove()
//         })
//     }
// }
// ableRemoveItem()

