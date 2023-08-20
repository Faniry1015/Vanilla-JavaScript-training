
const scale = {
    c: "Celcius",
    f: "Fahrenheit"
}

class TemperatureInput extends React.Component {

    constructor(props) {
        super(props)
        this.props.name
        this.state = {
            temperature: ""
        }
    }

    render() {
        return <div className="form-group">
        <label htmlFor={this.state.scale} className="form-label">Entrer la température en {this.state.scale} : </label>
        <input type="text" value={value} onChange={onChange} scale={this.state.scale} className="form-control"></input>
    </div>
    }

}

function BoilingVerdict({temperature}) {
    if (temperature >= 100) {
        return <div className="alert alert-success">The water is boiling</div>
    }
    return <div className="alert alert-info">The water is NOT boiling</div>
}


class Calculator extends React.Component {

    constructor(props) {
        super(props)
        this.state = { temperature: "" }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({temperature: e.target.value })
    }

    render() {
        const {temperature} = this.state
        return <div className="mb-3">
            <TemperatureInput value={temperature} onChange={this.handleChange} scale="c" />
            <TemperatureInput scale="f" />
            <hr/>

            <BoilingVerdict temperature={parseFloat(temperature)}/>
        </div>
    }
}


const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Calculator />)