// @ts-nocheck
const defer = require('defer-promise');
const expect = require('chai').expect;

const Dispatcher = require('../src/Dispatcher');

describe('Dispatcher', () => {
    const dispatcher = new Dispatcher();
    const theMessage = {};
    let promiseFoo;
    let promiseBar;
    let dispatchableFoo;
    let dispatchableBar;
    let calls;

    beforeEach(() => {
        calls = [];

        promiseFoo = defer();
        promiseBar = defer();

        dispatchableFoo = async message => {
            expect(message).to.equal(theMessage);

            calls.push('foo.before');
            await promiseFoo.promise;
            calls.push('foo.after');

            return 'foo';
        };
        dispatchableBar = async message => {
            expect(message).to.equal(theMessage);

            calls.push('bar.before');
            await promiseBar.promise;
            calls.push('bar.after');

            return 'bar';
        };
    });

    describe('#dispatch', () => {
        it('should invoke routes asynchronously', async () => {
            const dispatch = dispatcher.multidispatch(theMessage, [
                dispatchableFoo,
                dispatchableBar,
            ]);

            // Resolving deferred promises in reverse order
            promiseBar.resolve();
            promiseFoo.resolve();

            expect(await dispatch).to.have.ordered.members([
                'foo',
                'bar',
            ]);

            expect(calls).to.have.ordered.members([
                'foo.before',
                'bar.before',
                'foo.after',
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
            promiseBar.resolve();
            promiseFoo.resolve();

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
