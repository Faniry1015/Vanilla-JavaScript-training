function WelcomeFunct ({name, children}) {
    return <React.Fragment>
        <h1>Bonjour {name}</h1>
        <p>
            {children}
        </p>
    </React.Fragment>
}

class WelcomeClass extends React.Component {
    
    render() {
        return <React.Fragment>
        <h1>Bonjour {this.props.name}</h1>
        <p>
            {this.props.children}
        </p>
    </React.Fragment>
    }
}

class Clock extends React.Component {
    constructor (props) {
        super(props)
        this.state = {date: new Date()}
        this.timer = null
    }

    componentDidMount() {
       this.timer = window.setInterval(this.tick.bind(this), 1000)
    }

    componentWillUnmount() {
        window.clearInterval(this.timer)
    }

    tick() {
        this.setState({date: new Date()})
    }

    render () {
        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
}

class Incrementer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {n: props.start }
        this.timer = null
    }

    componentDidMount() {
        this.timer = window.setInterval(this.increment.bind(this), 1000)
    }

    componentWillUnmount() {
        window.clearInterval(this.timer)
    }

    increment() {
        this.setState((state, props) => ({n: state.n + 1}))
    }

    render() {
        return <div>
            J'attends depuis {this.state.n}
        </div>
    }
}

function Home () {
    return <React.Fragment>
        <WelcomeClass name="Faniry"/>
        <WelcomeClass name="Elisa"/>
        <Clock />
        <Incrementer start={10}/>
        <Incrementer start={100}/>
    </React.Fragment>
}

ReactDOM.render(Home(), document.querySelector("#app"))
