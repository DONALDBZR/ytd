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
             * The content that has been downloaded from YouTube
             * @type {JSON[]}
             */
            downloads: [],
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
     * Retriecing the JSON that is sent by the back-end for the front-end to use
     */
    retrieveData() {
        fetch("/Downloads", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => this.setState({
                downloads: data.downloads
            }));
    }
    componentDidMount() {
        this.retrieveData()
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
        if (this.state.category == 'music' || this.state.category == 'video') {
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
    componentDidMount() {
        this.retrieveData()
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
        if (this.verifyVideoURL() && this.verifyCategory()) {

        } else {
            this.setState({
                message: "The form must be filled correctly!",
                success: false,
                url: "/Dashboard",
            });
        }
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