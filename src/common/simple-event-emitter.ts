export interface ReadOnlySimpleEventEmitter<T> {
    subscribe(listener);
}
export class SimpleEventEmitter<T> {
    private listeners: ((val: T) => void)[] = [];

    /**
     *  Emit to the subcribers 
     * */
    emit(value: T) {
        this.listeners.forEach(listener => {
            listener(value);
        });
    }

    private unsubscribe(listener: (val: T) => void) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    /**
     * Subscribe to the EventEmitter, this method returns the unsubscribe function
     */
    subscribe(listener: () => void): () => void {
        this.listeners.push(listener);
        return () => this.unsubscribe(listener);
    }

    clearSubs() {
        this.listeners = [];
    }
    asObservable(): ReadOnlySimpleEventEmitter<T> {
        return (this as ReadOnlySimpleEventEmitter<T>);
    }
}