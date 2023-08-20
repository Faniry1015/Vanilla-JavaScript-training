const scaleNames = {
    c: "Celcius",
    f: "Fahrenheit"
}

class TemperatureInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {temperature: ""}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({temperature: e.target.value})
    }

    render() {
        const scaleName = scaleNames[this.props.scale]
        const name = "scale" + scaleName
        return <div className="form-group">
            <label className="form-text" htmlFor={name}>Entrer la température en degré {scaleName} :</label>
            <input className="form-control" name={name} id={name} value={this.state.temperature} onChange={this.handleChange}/>
        </div>

    }
}

function BoilingVerdict({ temperature }) {
    if (temperature >= 100) {
        return <div className="alert alert-success">L'eau est bouillante</div>
    }
    return <div className="alert alert-info">L'eau n'est pas bouillante</div>
}



class Thermomètre extends React.Component {

    constructor(props) {
        super(props)
        this.state = { temperature: "" }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState((state, props) => ({ temperature: e.target.value }))
    }

    render() {
        return <form className="container">
            <h1>Etat d'ébulition de l'eau</h1>
            <TemperatureInput scale="c" />
            <TemperatureInput scale="f" />
            <hr />
            <BoilingVerdict temperature={this.state.temperature} />
            {JSON.stringify(this.state)}
        </form>
    }
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Thermomètre />)