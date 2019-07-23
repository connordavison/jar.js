// @ts-nocheck
const defer = require('defer-promise');
const expect = require('chai').expect;

const Router = require('../src/Router');

describe('Router#submit', () => {
    const calls = [];

    const foo = defer();
    const bar = defer();
    const quux = defer();

    const middlewareFoo = async () => {
        calls.push('foo.before');
        await foo.promise;
        calls.push('foo.after');
    };
    const middlewareBar = async () => {
        calls.push('bar.before');
        await bar.promise;
        calls.push('bar.after');
    };
    const actionQuux = async () => {
        calls.push('quux.before');
        await quux.promise;
        calls.push('quux.after');
    };
    const routeCollection = {match: () => actionQuux};
    const router = new Router(
        [middlewareFoo, middlewareBar],
        routeCollection
    );

    it('should call actions synchronously', async () => {
        const transaction = {};
        const submission = router.submit(transaction);

        // Resolving deferred promises in reverse order
        quux.resolve();
        bar.resolve();
        foo.resolve();

        await submission;

        expect(calls).to.have.ordered.members([
            'foo.before',
            'foo.after',
            'bar.before',
            'bar.after',
            'quux.before',
            'quux.after',
        ]);
    });
});
