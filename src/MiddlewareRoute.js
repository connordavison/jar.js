const Dispatcher = require('./Dispatcher');

/**
 * @implements {RouteInterface<T>}
 * @template T
 */
class MiddlewareRoute {
    /**
     * @param {Middleware<T>[]} middleware
     * @param {Route<T>} route
     * @param {Dispatcher} dispatcher
     */
    constructor(middleware, route, dispatcher) {
        this.middleware = middleware;
        this.route = route;
        this.dispatcher = dispatcher;
    }

    /**
     * @template T
     * @param {Middleware<T>[]} middleware
     * @param {Route<T>} route
     */
    static create(middleware, route) {
        return new MiddlewareRoute(middleware, route, new Dispatcher());
    }

    /**
     * @param {T} message
     */
    async dispatch(message) {
        await this.dispatcher.multidispatchSync(message, this.middleware);

        return this.dispatcher.dispatch(message, this.route);
    }
}

module.exports = MiddlewareRoute;
