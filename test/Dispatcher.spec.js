const expect = require('chai').expect;

const Dispatcher = require('../src/Dispatcher');

describe('Dispatcher', () => {
    const dispatcher = new Dispatcher();
    const theMessage = {};
    let promiseFoo;
    let promiseBar;
    let resolveFoo;
    let resolveBar;
    let dispatchableFoo;
    let dispatchableBar;
    let calls;

    beforeEach(() => {
        calls = [];

        promiseFoo = new Promise(resolve => resolveFoo = resolve);
        promiseBar = new Promise(resolve => resolveBar = resolve);

        dispatchableFoo = async message => {
            expect(message).to.equal(theMessage);

            calls.push('foo.before');
            await promiseFoo;
            calls.push('foo.after');

            return 'foo';
        };
        dispatchableBar = async message => {
            expect(message).to.equal(theMessage);

            calls.push('bar.before');
            await promiseBar;
            calls.push('bar.after');

            return 'bar';
        };
    });

    describe('#multidispatch', () => {
        it('should invoke routes asynchronously', async () => {
            const dispatch = dispatcher.multidispatch(theMessage, [
                dispatchableFoo,
                dispatchableBar,
            ]);

            expect(calls).to.have.ordered.members(['foo.before', 'bar.before']);

            resolveFoo();
            resolveBar();

            expect(await dispatch).to.have.ordered.members([
                'foo',
                'bar',
            ]);

            expect(calls).to.have.members([
                'foo.before',
                'foo.after',
                'bar.before',
                'bar.after',
            ]);
        });
    });

    describe('#multidispatchSync', () => {
        it('should invoke routes synchronously', async () => {
            const dispatch = dispatcher.multidispatchSync(theMessage, [
                dispatchableFoo,
                dispatchableBar,
            ]);

            // Resolving deferred promises in reverse order
            resolveBar();
            resolveFoo();

            expect(await dispatch).to.have.ordered.members([
                'foo',
                'bar',
            ]);

            expect(calls).to.have.ordered.members([
                'foo.before',
                'foo.after',
                'bar.before',
                'bar.after',
            ]);
        });
    });
});
