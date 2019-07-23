// @ts-nocheck
const RouteCollection = require('../src/RouteCollection');
const RouteNotFoundError = require('../src/RouteNotFoundError');
const MultipleRoutesFoundError = require('../src/MultipleRoutesFoundError');
const expect = require('chai').expect;

describe('RouteCollection#match', () => {
    const routes = new Map();

    const equalityRouteMatcher = new class {
        match(route, transaction) {
            return route === transaction;
        }
    };

    const alwaysMatchesRouteMatcher = new class {
        match() {
            return true;
        }
    };

    const fooAction = () => {};
    const bazAction = () => {};

    routes.set('foo', fooAction);
    routes.set('bar', () => {});
    routes.set('baz', bazAction);

    it('should error if multiple routes are matched', () => {
        const collection = new RouteCollection(alwaysMatchesRouteMatcher, routes);

        expect(() => collection.match('quux')).to.throw(MultipleRoutesFoundError);
    });

    it('should error if no routes are matched', () => {
        const collection = new RouteCollection(equalityRouteMatcher, routes);

        expect(() => collection.match('quux')).to.throw(RouteNotFoundError);
    });

    it('should return the matched route', () => {
        const collection = new RouteCollection(equalityRouteMatcher, routes);

        expect(collection.match('foo')).to.equal(fooAction);
        expect(collection.match('baz')).to.equal(bazAction);
    });
});
