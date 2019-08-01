/**
 * @template T
 */
class InvalidDispatchableError extends Error {
    /**
     * @param {Dispatchable<T>} dispatchable
     */
    constructor(dispatchable) {
        super('Dispatchable should be a callable or an object implementing .dispatch(dispatchable)');

        this.dispatchable = dispatchable;
    }

    /**
     * @returns {Dispatchable<T>}
     */
    getDispatchable() {
        return this.dispatchable;
    }
}

module.exports = InvalidDispatchableError;
