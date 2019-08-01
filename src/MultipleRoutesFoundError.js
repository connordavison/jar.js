/**
 * @template T
 */
class MultipleRoutesFoundError extends Error {
    /**
     * @param {T} dispatchedMessage
     * @param {Route<T>[]} routes
     */
    constructor(dispatchedMessage, routes) {
        super('Dispatched message matched multiple routes')
        this.dispatchedMessage = dispatchedMessage;
        this.routes = routes;
    }

    /**
     * @returns {T}
     */
    getDispatchedMessage() {
        return this.dispatchedMessage;
    }

    /**
     * @returns {Route<T>[]}
     */
    getRoutes() {
        return this.routes;
    }
}

module.exports = MultipleRoutesFoundError;
