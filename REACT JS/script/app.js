function WelcomeFunc({ name, children }) {
    return <div>
        <h1>Bonjour {name}</h1>
        <p>
            {children}
        </p>
    </div>

}


class WelcomeClass extends React.Component {

    render() {
    return <div>
        <h1>Bonjour {this.props.name}</h1>
        <p>
            {this.props.children}
        </p>
    </div>
    }
}


ReactDOM.render(<WelcomeClass name="Faniry">Faniry est un mec cool</WelcomeClass>, document.querySelector("#app"))