/**
 * @template Transaction
 */
class RouteNotFoundError extends Error {
    /**
     * @param {Transaction} transaction
     */
    constructor(transaction) {
        super('Transaction did not match a route');
        this.transaction = transaction;
    }

    /**
     * @returns {Transaction}
     */
    getTransaction() {
        return this.transaction;
    }
}

module.exports = RouteNotFoundError;
