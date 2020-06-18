/**
 * @template T
 */
class InvalidDispatchableError extends Error {
    constructor(invalidDispatchable) {
        super('Dispatchable should be a callable or an object implementing .dispatch(dispatchable)');

        this.invalidDispatchable = invalidDispatchable;
    }

    /**
     * @returns {Dispatchable<T>}
     */
    getInvalidDispatchable() {
        return this.invalidDispatchable;
    }
}

module.exports = InvalidDispatchableError;
