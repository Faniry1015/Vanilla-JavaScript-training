let n = 0

const items = ["item 1", "item 2", "item 3"]
const lis = items.map((item, key) =>  <li key={key}>{item}</li>)
console.log(lis)

function formatNumber(n) {
    return n.toString().padStart(2, "0")
}

function render() {
    const title = <React.Fragment>
    <h1>Bonjour 
    <span> {formatNumber(n) % 2 ? formatNumber(n) : null}</span></h1>
    <ul>
        {lis}
    </ul>
    </React.Fragment>
    
    ReactDOM.render(title, document.querySelector("#app"))
}

setInterval(() => {
    render()
    n++
}, 1000)


