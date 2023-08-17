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

class Counter extends React.Component {

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
        console.log(btn)
        const btnClass = btn.classList
        if (btnClass.contain("play")) {
            
        }
        window.clearInterval(this.timer)
        btnClass.add("paused")
        btn.innerText = "play"
    }

    render() {
        return <div>
            Counter : {this.state.n}
            <button id="btn" onClick={this.playPause.bind(this)}>pause</button>
        </div>
    }

}

Counter.defaultProps = {
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
        <Counter start={1} step={10} />
        <Clock />
    </React.Fragment>


}

ReactDOM.render(myComponent(), document.querySelector("#app"))
