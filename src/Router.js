const InvalidActionError = require('./InvalidActionError');
const RouteCollection = require('./RouteCollection');

/**
 * @implements {ActionInterface<Transaction>}
 * @template Route, Transaction
 */
class Router {
    /**
     * @param {Action<Transaction>[]} middleware
     * @param {RouteCollection<Route, Transaction>} routeCollection
     */
    constructor(middleware, routeCollection) {
        this.middleware = middleware;
        this.routeCollection = routeCollection;
    }

    /**
     * @param {Transaction} transaction
     */
    async submit(transaction) {
        const action = this.routeCollection.match(transaction);

        for (const middleware of this.middleware) {
            await this.apply(middleware, transaction);
        }

        return this.apply(action, transaction);
    }

    /**
     * @param {Action<Transaction>} action
     * @param {Transaction} transaction
     * @private
     */
    async apply(action, transaction) {
        switch (typeof action) {
            case 'function':
                return action(transaction);
            case 'object':
                return action.submit(transaction);
        }

        throw new InvalidActionError(action);
    }
}

module.exports = Router;
