type State<T> =
    | {
        state: 'pending',
        promise: Promise<T>
    }
    | {
        state: 'fulfilled',
        value: T,
    }
    | {
        state: 'rejected',
        error: any,
    };

export class Fetcher<T> {
    private state: State<T>;
    constructor(fetch: () => Promise<T>) {
        const promise = fetch().then(
            value => {
                this.state = {
                    state: 'fulfilled',
                    value,
                };
                return value;
            },
            error => {
                this.state = {
                    state: 'rejected',
                    error,
                }
                throw error;
            },
        )
        this.state = {
            state: 'pending',
            promise,
        }
    }

    public get(): T {
        if (this.state.state === 'pending') {
            throw this.state.promise;
        }
        if (this.state.state === 'rejected') {
            throw this.state.error;
        }
        return this.state.value;
    }
}