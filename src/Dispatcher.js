const InvalidDispatchableError = require('./InvalidRouteError');

/**
 * @implements {DispatcherInterface<T>}
 * @template T
 */
class Dispatcher {
    /**
     * @param {T} message
     * @param {Dispatchable<T>} dispatchable
     * @returns {Promise}
     */
    async dispatch(message, dispatchable) {
        if ('function' === typeof dispatchable) {
            return dispatchable(message);
        } else if ('object' === typeof dispatchable
            && 'function' === typeof dispatchable.dispatch
        ) {
            return dispatchable.dispatch(message);
        }

        throw new InvalidDispatchableError(dispatchable);
    }

    /**
     * @param {T} message
     * @param {Dispatchable<T>[]} dispatchables
     * @returns {Promise}
     */
    async multidispatch(message, dispatchables) {
        const promises = dispatchables.map(
            route => this.dispatch(message, route)
        );

        return Promise.all(promises);
    }

    /**
     * @param {T} message
     * @param {Dispatchable<T>[]} dispatchables
     * @returns {Promise}
     */
    async multidispatchSync(message, dispatchables) {
        const responses = [];

        for (const route of dispatchables) {
            responses.push(await this.dispatch(message, route));
        }

        return responses;
    }
}

module.exports = Dispatcher;
