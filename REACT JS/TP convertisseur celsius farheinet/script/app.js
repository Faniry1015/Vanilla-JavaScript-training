const scaleNames = {
    c: "Celcius",
    f: "Fahrenheit"
}

function toFahrenheit(celsius) {
    return celsius * (9/5) + 32
}

function toCelsius (fahrenheit) {
    return (fahrenheit - 32) * 5/9
}

function tryConvert(temperature, convert) {
    const value = parseFloat(temperature)
    if (Number.isNaN(value)) {
        return ""
    }
    return (Math.round(convert((value) * 100) / 100).toString())
}

class TemperatureInput extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        const scaleName = scaleNames[this.props.scale]
        const name = "scale" + scaleName
        const {temperature} = this.props
        return <div className="form-group">
            <label className="form-text" htmlFor={name}>Température en {scaleName} :</label>
            <input type="text" className="form-control" id={name} value={temperature} onChange={this.handleChange}/>
        </div>
    }

}

function BoilingVerdict({ celsius }) {
    if (celsius >= 100) {
        return <div className="alert alert-success">L'eau est bouillante</div>
    }
    return <div className="alert alert-info">L'eau n'est pas bouillante</div>
}



class Thermomètre extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            scale: "c",
            temperature: 20 }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrennheitChange = this.handleFahrennheitChange.bind(this)
    }

    handleCelsiusChange(temperature) {
        this.setState({
            scale: "c",
            temperature
        })
    }

    handleFahrennheitChange(temperature) {
        this.setState({
            scale: "f",
            temperature
        })
    }


    render() {
        const {temperature, scale} = this.state
        const celsius = scale === "c" ? temperature : tryConvert(temperature, toCelsius)
        const fahrenheit = scale ==="f" ? temperature : tryConvert(temperature, toFahrenheit)
        return <form className="container mt-4">
            <h1>Etat d'ébulition de l'eau</h1>
            <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
            <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrennheitChange} />
            <hr />
            <BoilingVerdict celsius={celsius} />
            {JSON.stringify(this.state)}
        </form>
    }
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Thermomètre />)