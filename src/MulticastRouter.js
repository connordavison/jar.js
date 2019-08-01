const Dispatcher = require('./Dispatcher');

/**
 * @implements {RouteInterface<T>}
 * @template T
 */
class MulticastRouter {
    /**
     * @param {DispatcherInterface<T>} dispatcher
     * @param {RouteRepositoryInterface<T>} repository
     */
    constructor(dispatcher, repository) {
        this.dispatcher = dispatcher;
        this.repository = repository;
    }

    /**
     * @template T
     * @param {RouteRepositoryInterface<T>} repository
     * @returns {MulticastRouter<T>}
     */
    static create(repository) {
        return new MulticastRouter(new Dispatcher(), repository);
    }

    /**
     * @param {T} message
     * @returns {Promise}
     */
    async dispatch(message) {
        return this.dispatcher.multidispatch(
            message,
            this.repository.findAll(message)
        );
    }
}

module.exports = MulticastRouter;
