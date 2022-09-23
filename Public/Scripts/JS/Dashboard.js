/**
 * The user interface that is being rendered
 */
class Application extends React.Component {
    constructor(props) {
        super(props);
        /**
         * The states of the properties of the component
         */
    }
    /**
     * Retriecing the JSON that is sent by the back-end for the front-end to use
     */
    retrieveData() {
        fetch("/Downloads", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }
    componentDidMount() { 
        this.retrieveData()
    }
    /**
     * @returns {JSX} Component
     */
    render() {
        return [<Header />, <Main />];
    }
}
class Header extends Application {
    /**
     * @returns {JSX} Component
     */
    render() {
        return (
            <header>
                <a href="/" class="fa fa-youtube"></a>
            </header>
        );
    }
}
class Main extends Application {
    /**
     * @returns {JSX} Component
     */
    render() {
        return (
            <main>
                Downloads
            </main>
        );
    }
}
ReactDOM.render(<Application />, document.getElementById("dashboard"));