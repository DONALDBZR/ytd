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
                <i class="fa fa-youtube"></i>
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
                <a href="/Dashboard" class="fa fa-tachometer"></a>
            </main>
        );
    }
}
ReactDOM.render(<Application />, document.getElementById("homepage"));