// @ts-nocheck
const RouteRepository = require('../src/RouteRepository');
const RouteNotFoundError = require('../src/RouteNotFoundError');
const MultipleRoutesFoundError = require('../src/MultipleRoutesFoundError');
const expect = require('chai').expect;

describe('RouteRepository#find', () => {
    const fooRoute = () => {};
    const barRoute = () => {};

    const alwaysMatcher = {match: () => true};
    const neverMatcher = {match: () => false};
    const barMatcher = {
        match: (message, route) => 'bar' === message && barRoute === route,
    };

    const routes = [fooRoute, barRoute];

    it('should error if multiple routes are matched', () => {
        const collection = new RouteRepository(alwaysMatcher, routes);

        expect(() => collection.find('foo')).to.throw(MultipleRoutesFoundError);
    });

    it('should error if no routes are matched', () => {
        const collection = new RouteRepository(neverMatcher, routes);

        expect(() => collection.find('bar')).to.throw(RouteNotFoundError);
    });

    it('should return the matched route', () => {
        const collection = new RouteRepository(barMatcher, routes);

        expect(collection.find('bar')).to.equal(barRoute);
    });
});
