/**
 * The application that is going to be rendered by React.js.
 */
class Application extends React.Component {
    constructor(props) {
        super(props);
        /**
         * The states of the properties of the component
         */
        this.state = {
            /**
             * The url of the video
             */
            videoURL: "",
            /**
             * An HTML's id attribute that will be used for rendering the message that will be displayed to the user
             */
            success: "",
            /**
             * The message that will be displayed to the user
             */
            message: "",
            /**
             * the url to be redirected after displying the message
             */
            url: "",
        };
    }
    /**
    * Handling any change that is made in the user interface
    * @param {Event} event 
    */
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }
    /**
     * Handling the form submission firstly preventing default submission before generating the JSON that will be sent to the back-end before retrieving a JSON as a response which contains the message and the destination to send the user.
     * @param {Event} event 
     */
    handleSubmit(event) {
        /**
         * The amount of milliseconds that the registration process takes
         */
        const delay = 2225;
        event.preventDefault();
        fetch("/Controllers/Homepage.php", {
            method: "POST",
            body: JSON.stringify({
                videoURL: this.state.videoURL,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => this.setState({
                success: data.success,
                message: data.message,
                url: data.url,
            }))
            .then(() => this.redirector(delay));
    }
    /**
     * Redirecting the user to an intended url
     * @param {int} delay 
     */
    redirector(delay) {
        setTimeout(() => {
            window.location.href = this.state.url;
        }, delay);
    }
    render() {
        return [<Header />, <Main />];
    }
}
/**
 * The header component of the application which has the header tag as parent
 */
class Header extends Application {
    render() {
        return (
            <header>
                <div id="label">YouTube Downloader</div>
                <div id="logo">
                    <i class="fab fa-youtube"></i>
                </div>
            </header>
        );
    }
}
/**
 * The main component of the application which has the main tag as parent
 */
class Main extends Application {
    render() {
        return (
            <main>
                <Form />
            </main>
        );
    }
}
/**
 * The form component of the application which has the form tag as parent
 */
class Form extends Application {
    render() {
        return (
            <form method="POST" onSubmit={this.handleSubmit.bind(this)}>
                <div id="name">Download Form</div>
                <input
                    type="text"
                    name="videoURL"
                    placeholder="Video's URL"
                    value={this.state.videoURL}
                    onChange={this.handleChange.bind(this)}
                    required
                />
                <div id="button">
                    <button>Register</button>
                </div>
                <div id="serverRendering">
                    <h1 id={this.state.success}>{this.state.message}</h1>
                </div>
            </form>
        );
    }
}
// Rendering page
ReactDOM.render(<Application />, document.getElementById("homepage"));