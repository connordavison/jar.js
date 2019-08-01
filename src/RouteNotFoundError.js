/**
 * @template T
 */
class RouteNotFoundError extends Error {
    /**
     * @param {T} dispatchable
     */
    constructor(dispatchable) {
        super('Dispatchable did not match a route');
        this.dispatchable = dispatchable;
    }

    /**
     * @returns {T}
     */
    getDispatchable() {
        return this.dispatchable;
    }
}

module.exports = RouteNotFoundError;
