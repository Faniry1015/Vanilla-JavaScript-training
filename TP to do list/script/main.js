class CreateList {
    items = []
    prevItemId = 0

    addItem(item) {
        item.itemId = ++this.prevItemId

        const checkInput = document.createElement("input")
        checkInput.setAttribute("type", "checkbox")
        checkInput.className = "form-check-input"
        checkInput.setAttribute("id", `todo-${item.itemId}`)

        const checkLabel = document.createElement("label")
        checkLabel.textContent = item.label
        checkLabel.setAttribute("for", `todo-${item.itemId}`)

        const trashLabel = document.createElement("label")
        trashLabel.className = "ms-auto btn btn-danger btn-sm"

        const trashBtnSel = document.createElement("i")
        trashBtnSel.className = "bi-trash"
        trashBtnSel.setAttribute("id", `${item.itemId}`)
        trashLabel.append(trashBtnSel)

        const checkLi = document.createElement("li")
        checkLi.className = "todo list-group-item d-flex align-items-center"
        checkLi.append(checkInput, checkLabel, trashLabel)
        const listGroup = document.querySelector(".list-group")
        listGroup.append(checkLi)

        this.items.push(item)
        console.log(this)
    }

    removeItem() {
        let trashBtnAll = document.querySelectorAll(".bi-trash")
        // console.log("1: ", trashBtnAll)
        for (let trashBtn of trashBtnAll) {
            trashBtn.addEventListener("click", (event) => {
                event.preventDefault()
                // console.log("2: ", trashBtnAll)
                for (let item of this.items) {
                    if (parseInt(trashBtn.getAttribute("id"), 10) === item.itemId) {
                        // console.log( "3: ",trashBtn.getAttribute("id"), item.itemId)
                        trashBtn.parentNode.parentNode.remove()
                        this.items.splice(this.items.indexOf(item), 1)
                        // console.log(this.items)
                    }
                }
            })
        }
    }

    filterDoneTasks() {
        const doneBtn = document.querySelector("button[data-filter=done]")
        doneBtn.addEventListener("click", () => {
            const unchecked = document.querySelectorAll("input[class=form-check-input]:not(:checked)")
            console.log("uncheck: ", unchecked)
            // unchecked.forEach((e) => {
            // console.log(e)
            // })
        }) 
    }
}
const mainList = new CreateList()

class ToDoListItem {
    itemId = null
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
    mainList.filterDoneTasks()
    mainList.removeItem()
})  