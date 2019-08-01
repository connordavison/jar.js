const MultipleRoutesFoundError = require('./MultipleRoutesFoundError');
const RouteNotFoundError = require('./RouteNotFoundError');

/**
 * @implements {RouteRepositoryInterface<T>}
 * @template T
 */
class RouteRepository {
    /**
     * @param {MessageRouteMatcherInterface<T>} routeMatcher
     * @param {Route<T>[]} routes
     */
    constructor(routeMatcher, routes) {
        this.routeMatcher = routeMatcher;
        this.routes = routes;
    }

    /**
     * @param {T} message
     * @returns {Route<T>}
     */
    find(message) {
        /** @type {Route<T>[]} */
        const matched = this.findAll(message);

        if (matched.length > 1) {
            throw new MultipleRoutesFoundError(message, matched);
        }

        if (matched.length < 1) {
            throw new RouteNotFoundError(message);
        }

        return matched.shift();
    }

    /**
     * @param {T} message
     * @returns {Route<T>[]}
     */
    findAll(message) {
        return this.routes.filter(
            route => this.routeMatcher.match(message, route)
        );
    }
}

module.exports = RouteRepository;
