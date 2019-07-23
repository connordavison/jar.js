class InvalidActionError extends Error {
    /**
     * @param {any} action
     */
    constructor(action) {
        super();
        this.action = action;
    }

    /**
     * @returns {any}
     */
    getAction() {
        return this.action;
    }
}

module.exports = InvalidActionError;
