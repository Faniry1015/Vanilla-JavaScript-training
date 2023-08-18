class InputText extends React.Component {

    constructor(props) {
        super(props)
        this.state = {name: "userName" }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({name: e.target.value})
        
    }

    render() {
        return <form>
            <label htmlFor="nom">Nom: </label>
            <input type="text" name="nom" value={this.state.name} onChange={this.handleChange} />
        </form>
    }
}

class Textarea extends React.Component {

    constructor(props) {
        super(props)
        this.state = {text: "mon texte"}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState((state, props) => ({text: e.target.value}))
    }

    render() {
        return <form>
            <label htmlFor="textarea">Votre textarea : </label>
            <textarea value={this.state.text} onChange={this.handleChange}></textarea>
        </form>
    }
}

class Select extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {choice: "Opt2"}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState((state, props) => ({choice: e.target.value}))
    }

    render() {
        return <form>
            <select value={this.state.choice} onChange={this.handleChange}>
                <option value="Opt1">Option 1</option>
                <option value="Opt2">Option 2</option>
                <option value="Opt3">Option 3</option>
            </select>
        </form>
    }

}

class SelectMulti extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {choice: ["Opt2", "Opt3"] }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        console.log(e.target.selectedOptions)
        this.setState((state, props) => ({choice: Array.from(e.target.selectedOptions).map(option => option.value)}))
    }

    render() {
        return <form>
            <select multiple value={this.state.choice} onChange={this.handleChange}>
                <option value="Opt1">Option 1</option>
                <option value="Opt2">Option 2</option>
                <option value="Opt3">Option 3</option>
            </select>
        </form>
    }

}

class Radio extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {check: false}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({check: e.target.checked})
   }

    render() {
        return <form>
        <label htmlFor="checkB">Cocher pour afficher le message</label>
            <input name="checkB" type="checkbox" checked={this.state.check} onChange={this.handleChange}></input>
           {this.state.check ? <div>S'affiche uniquement si la checkbox est cochée</div> : null} 
        </form>
    }
}

class FormMulti extends React.Component {

    constructor(props) {
        super(props)
        this.state = {nom: ""}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({nom: e.target.value})
    }



    render() {
        return <form>
            <div>
                <label htmlFor="nom">Nom</label>
                <input type="text" id="nom" name="nom" value={this.state.nom} onChange={this.handleChange}></input>
            </div>
        </form>
    }
}

function Form() {
    return <React.Fragment>
        <InputText />
        <Textarea />
        <Select />
        <SelectMulti />
        <Radio />
        <FormMulti />
    </React.Fragment>
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Form />)
