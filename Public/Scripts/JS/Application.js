/**
 * The application router which allows the routing and rendering of the application's url and data from the back-end to the front-end
 */
class Route {
    /**
     * The request URI of the application
     * @type {string}
     */
    requestURI;
    /**
     * The identifier of the page
     * @type {string}
     */
    pageIdentifier;
    constructor() {
        window.addEventListener('load', this.pageLocator());
    }
    getRequestURI() {
        return this.requestURI;
    }
    /**
     * @param {string} request_URI 
     */
    setRequestURI(request_URI) {
        this.requestURI = request_URI;
    }
    getPageIdentifier() {
        return this.pageIdentifier;
    }
    /**
     * @param {string} page_Identifier 
     */
    setPageIdentifier(page_Identifier) {
        this.pageIdentifier = page_Identifier;
    }
    pageLocator() {
        const body = document.getElementsByTagName('body')[0];
        this.setRequestURI(window.location.pathname.toLowerCase());
        this.setPageIdentifier(this.getRequestURI());
        if (this.getRequestURI() === "/") {
            this.setPageIdentifier('homepage');
        } else {
            this.setPageIdentifier(this.getPageIdentifier().replace('/', ''));
        }
        body.id = this.getPageIdentifier();
    }
}
const app = new Route();