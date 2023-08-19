class InputText extends React.Component {

    constructor(props) {
        super(props)
        this.state = { name: "userName" }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({ name: e.target.value })

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
        this.state = { text: "mon texte" }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState((state, props) => ({ text: e.target.value }))
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
        this.state = { choice: "Opt2" }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState((state, props) => ({ choice: e.target.value }))
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
        this.state = { choice: ["Opt2", "Opt3"] }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        console.log(e.target.selectedOptions)
        this.setState((state, props) => ({ choice: Array.from(e.target.selectedOptions).map(option => option.value) }))
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

class Checkbox extends React.Component {

    constructor(props) {
        super(props)
        this.state = { check: false }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({ check: e.target.checked })
    }

    render() {
        return <form>
            <label htmlFor="checkB">Cocher pour afficher le message</label>
            <input name="checkB" type="checkbox" checked={this.state.check} onChange={this.handleChange}></input>
            {this.state.check ? <div>S'affiche uniquement si la checkbox est cochée</div> : null}
        </form>
    }
}

function Form() {
    return <React.Fragment>
        <InputText />
        <Textarea />
        <Select />
        <SelectMulti />
        <Checkbox />
    </React.Fragment>
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Form />)


/************************************************************************************************************ */


class FormMulti extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nom: "",
            prenom: "",
            newsletter: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const targeted = e.target
        const k = targeted.name
        const targetType = targeted.type
        console.log(targetType)
        const value = targetType === "text" ? targeted.value : targeted.checked
        this.setState({ [k]: value })
    }

    render() {
        /**Champ controler : react track à chaque changement. ce qui n'est pas très performant si on a pas besoin de traquer à chaque changement. Utilisé devaultValue sans onChange pour ne pas traqué*/
        return <form>
            <div>
                <label htmlFor="nom">Nom</label>
                <input type="text" id="nom" name="nom" value={this.state.nom} onChange={this.handleChange}></input>
            </div>

            <div>
                <label htmlFor="prenom">Prénom</label>
                <input type="text" id="prenom" name="prenom" value={this.state.prenom} onChange={this.handleChange}></input>
            </div>

            <div>
                <label htmlFor="newsletter">S'abonner à la newsletter ?</label>
                <input type="checkbox" id="newsletter" name="newsletter" checked={this.state.newsletter} onChange={this.handleChange}></input>
            </div>
        </form>
    }
}

function Form2() {
    return <React.Fragment>
        <FormMulti />
    </React.Fragment>
}

const root2 = ReactDOM.createRoot(document.querySelector("#app2"))
root2.render(<Form2 />)


/** Utilisé des composantes avec intégration bootstrap */

function FormText({ name, value, onChange, children }) {
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control" />
    </div>
}

function FormCheck({ name, value, onChange, children }) {
    return <div className="form-check">
        <input type="checkbox" checked={value} onChange={onChange} id={name} name={name} className="form-check-input" />
        <label htmlFor={name} className="form-check-label">{children}</label>
    </div>
}

class FormCompBootstrap extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nom: "",
            prenom: "",
            newsletter: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const targeted = e.target
        const k = targeted.name
        const targetType = targeted.type
        const value = targetType === "text" ? targeted.value : targeted.checked
        this.setState({ [k]: value })
    }

    handleSubmit(e) {
        e.preventDefault()
        const data = JSON.stringify(this.state)
        console.log(data)
        this.setState({
            nom:"",
            prenom:"",
            newsletter: false
        })
    }

    render() {
        /**Champ controler : react track à chaque changement. ce qui n'est pas très performant si on a pas besoin de traquer à chaque changement. Utilisé devaultValue sans onChange pour ne pas traqué*/
        return <form className="container" onSubmit={this.handleSubmit}>
            <FormText name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</FormText>
            <FormText name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prénom</FormText>
            <FormCheck name="newsletter" checked={this.state.newsletter} onChange={this.handleChange}>S'abonner à la newsletter</FormCheck>
            {this.state.newsletter ? <div>S'affiche uniquement si la checkbox est cochée</div> : null}
            <div className="form-group">
            <button className="btn btn-primary" >Envoyer</button>
            </div>

            {JSON.stringify(this.state)}
        </form>
    }
}

const root3 = ReactDOM.createRoot(document.querySelector("#app3"))
root3.render(<FormCompBootstrap />)
