declare interface RouteInterface<T> {
    dispatch(message: T): any;
}

declare type Route<T> = RouteInterface<T> | ((message: T) => any);

declare interface MessageRouteMatcherInterface<T> {
    match(message: T, route: Route<T>): boolean;
}

declare interface RouteRepositoryInterface<T> {
    find(message: T): Route<T>;
    findAll(message: T): Route<T>[];
}

declare type Middleware<T> = Route<T>;

declare type Dispatchable<T> = Route<T> | Middleware<T>;

declare interface DispatcherInterface<T> {
    dispatch(message: T, dispatchable: Dispatchable<T>);
    multidispatch(message: T, dispatchables: Dispatchable<T>[]);
    multidispatchSync(message: T, dispatchables: Dispatchable<T>[]);
}
