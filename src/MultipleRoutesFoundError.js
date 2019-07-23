/**
 * @template Transaction, Route
 */
class MultipleRoutesFoundError extends Error {
    /**
     * @param {Transaction} transaction
     * @param {Route[]} routes
     */
    constructor(transaction, routes) {
        super('Transaction matched multiple routes')
        this.transaction = transaction;
        this.routes = routes;
    }

    /**
     * @returns {Transaction}
     */
    getTransaction() {
        return this.transaction;
    }

    /**
     * @returns {Route[]}
     */
    getRoutes() {
        return this.routes;
    }
}

module.exports = MultipleRoutesFoundError;
