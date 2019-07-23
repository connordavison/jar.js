const MultipleRoutesFoundError = require('./MultipleRoutesFoundError');
const RouteNotFoundError = require('./RouteNotFoundError');

/**
 * @implements {RouteCollectionInterface<Route, Transaction>}
 * @template Route, Transaction
 */
class RouteCollection {
    /**
     * @param {RouteMatcherInterface<Route, Transaction>} routeMatcher
     * @param {Map<Route, Action<Transaction>>} routes
     */
    constructor(routeMatcher, routes) {
        this.routeMatcher = routeMatcher;
        this.routes = routes;
    }

    /**
     * @param {Transaction} transaction
     * @returns {Action<Transaction>}
     */
    match(transaction) {
        /** @type {Route[]} */
        const matched = [];

        this.routes.forEach((_, route) => {
            if (this.routeMatcher.match(route, transaction)) {
                matched.push(route);
            }
        });

        if (matched.length > 1) {
            throw new MultipleRoutesFoundError(transaction, matched);
        }

        if (matched.length < 1) {
            throw new RouteNotFoundError(transaction);
        }

        return this.routes.get(matched[0]);
    }
}

module.exports = RouteCollection;
