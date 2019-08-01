const Dispatcher = require('./Dispatcher');

/**
 * @implements {RouteInterface<T>}
 * @template T
 */
class UnicastRouter {
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
     * @returns UnicastRouter<T>
     */
    static create(repository) {
        return new UnicastRouter(new Dispatcher(), repository);
    }

    /**
     * @param {T} message
     * @returns {Promise}
     */
    async dispatch(message) {
        return this.dispatcher.dispatch(
            message,
            this.repository.find(message)
        );
    }
}

module.exports = UnicastRouter;
