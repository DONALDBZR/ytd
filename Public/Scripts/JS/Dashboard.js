/**
 * The user interface that is being rendered
 */
class Application extends React.Component {
    constructor(props) {
        super(props);
        /**
         * The states of the properties of the component
         */
        this.state = {
            /**
             * The URL of the video
             * @type {string}
             */
            videoURL: "",
            /**
             * The category of the video
             * @type {string}
             */
            category: "",
            /**
             * Message that will be displayed to the user
             * @type {string}
             */
            message: "",
            /**
             * A boolean which is a successful or failure request
             * @type {boolean}
             */
            success: false,
            /**
             * URL to redirect the user
             * @type {string}
             */
            url: "",
        };
    }
    /**
     * Verifying the video's URL
     */
    verifyVideoURL() {
        if (this.state.videoURL.includes('youtube.com')) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Verifying the category of the video that will be downloaded
     */
    verifyCategory() {
        if (this.state.category == 'Music' || this.state.category == 'Video') {
            return true;
        } else {
            return false;
        }
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
    constructor(props) {
        super(props);
    }
    /**
     * @returns {JSX} Component
     */
    render() {
        return (
            <main>
                <Form />
            </main>
        );
    }
}
class Form extends Main {
    constructor(props) {
        super(props);
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
     * Handling the form submission
     * @param {Event} event
     */
    handleSubmit(event) {
        event.preventDefault();
        if (this.verifyVideoURL()) {
            if (this.verifyCategory()) {
                fetch("/Downloads", {
                    method: "POST",
                    body: JSON.stringify({
                        videoURL: this.state.videoURL,
                        category: this.state.category,
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
            } else {
                this.setState({
                    message: "That type of media does not exist!",
                    success: false,
                });
            }
        } else {
            this.setState({
                message: "It is not a video from YouTube!",
                success: false,
            });
        }
    }
    redirector(delay) {
        setTimeout(() => {
            window.location.href = this.state.url;
        }, delay);
    }
    /**
     * @returns {JSX} Component
     */
    render() {
        return (
            <form method="POST" onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="url"
                    name="videoURL"
                    placeholder="Video's URL"
                    value={this.state.videoURL}
                    onChange={this.handleChange.bind(this)}
                    autocomplete="off"
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={this.state.category}
                    onChange={this.handleChange.bind(this)}
                    autocomplete="off"
                    required
                />
                <button class="fa fa-download"></button>
                <FormResponse />
            </form>
        );
    }
}
class FormResponse extends Form {
    constructor(props) {
        super(props);
    }
    /**
     * @returns {JSX} Component
     */
    render() {
        return (
            <div id='response' class={this.state.success}>{this.state.message}</div>
        );
    }
}
ReactDOM.render(<Application />, document.getElementById("dashboard"));