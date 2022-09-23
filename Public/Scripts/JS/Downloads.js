/**
 * The user interface that is being rendered
 */
class Application extends React.Component {
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
ReactDOM.render(<Application />, document.getElementById("downloads"));