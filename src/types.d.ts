declare interface ActionInterface<Transaction> {
    submit(transaction: Transaction): void;
}

declare type Action<Transaction> = ActionInterface<Transaction>
    | ((Transaction) => void);

declare interface RouteMatcherInterface<Route, Transaction> {
    match(route: Route, transaction: Transaction): boolean;
}

declare interface RouteCollectionInterface<Route, Transaction> {
    match(transaction: Transaction): Route;
}
