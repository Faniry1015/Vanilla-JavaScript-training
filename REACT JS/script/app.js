function WelcomeFunc({ name, children }) {
    return <React.Fragment>
        <h1>Bonjour {name}</h1>
        <div>{children}</div>
    </React.Fragment>
}

class WelcomeClass extends React.Component {

    render() {
        return <React.Fragment>
            <h1>Bonjour {this.props.name}</h1>
            <div>{this.props.children}</div>
        </React.Fragment>
    }

}


//Faniry Incrementer, correction plus bas
class IncrementerFan extends React.Component {

    constructor(props) {
        super(props)
        this.state = { n: props.start, y: props.step }
        this.timer = null
    }

    componentDidMount() {
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }

    componentWillUnmount() {
        window.clearInterval(this.timer)
    }

    tick() {
        this.setState((state, props) => ({ n: this.state.n + this.state.y }))
    }

    playPause() {
        const btn = document.querySelector("#btn")
        const btnClass = btn.classList
        console.log(btnClass)
        if (btnClass.contains("paused")) {
            this.timer = window.setInterval(this.tick.bind(this), 1000)
            console.log(btn)
        } else {
            window.clearInterval(this.timer)
        }
        btn.innerText = btnClass.toggle("paused") ? "play" : "pause"
    }

    render() {
        return <div>
            Incrementer Value : {this.state.n} 
            <button id="btn" onClick={this.playPause.bind(this)}>pause</button>
        </div>
    }
}

class Incrementer extends React.Component {

    constructor(props) {
        super(props)
        this.state = { n: props.start, timer: null}
        this.timer = null
    }

    componentDidMount() {
        this.play()
    }

    componentWillUnmount() {
        window.clearInterval(this.state.timer)
    }

    increment() {
        this.setState((state, props) => ({n : state.n + 1}))
    }

    pause() {
        window.clearInterval(this.state.timer)
        this.setState({timer: null})
    }

    play() {
        window.clearInterval(this.state.timer)
        this.setState({timer: window.setInterval(this.increment.bind(this), 1000)}) 
    }

    render() {
        return <div>
            Incrementer Value : {this.state.n} 
            {this.state.timer ? <button onClick={this.pause.bind(this)}>pause</button> :
            <button onClick={this.play.bind(this)}>play</button>}

        </div>
    }
}
class ManualIncrementer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {n: props.start}
    }

    tick() {
        this.setState((state, props) => ({n: state.n + 1}))
    }

    render() {
        return <div>
            Value: {this.state.n} 
            <button onClick={this.tick.bind(this)}>+1</button>
        </div>
    }
}

Incrementer.defaultProps = {
    start: 0,
    step: 1
}

class Clock extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {date: new Date()}
        this.timer = null
    }

    componentDidMount() {
        this.timer = window.setInterval(this.date.bind(this), 1000)
    }

    componentWillUnmount() {
        window.clearInterval(this.timer)
    }

    date() {
        const now = new Date()
        this.setState((state, props) =>({date: now}) )
    }

    render() {
        return <React.Fragment>
            Il est : {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </React.Fragment>
    }
}

function myComponent() {
    return <React.Fragment>
        <WelcomeClass name="Faniry" />
        <Incrementer start={1} step={2} />
        <ManualIncrementer start={0} />
        <Clock />
    </React.Fragment>


}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(myComponent())
