/** Serialize selected asynchronous mutations by key without retaining completed keys. */
export interface Fence<Key> {
	/** Wait until the currently registered mutation for one key settles. */
	wait(key: Key): Promise<void>;
	/** Run one mutation after earlier mutations for the same key have settled. */
	run<Value>(key: Key, operation: () => Promise<Value>): Promise<Value>;
}

/**
 * Create a keyed asynchronous mutation fence.
 *
 * Failed mutations still release the key and do not poison later operations.
 * Callers remain responsible for the semantic cancellation or generation check
 * that decides whether work is still valid after waiting.
 */
export function create<Key>(): Fence<Key> {
	const active = new Map<Key, Promise<void>>();

	return {
		async wait(key) {
			await active.get(key);
		},
		async run(key, operation) {
			const previous = active.get(key);
			const result = (previous ? previous.catch(() => undefined) : Promise.resolve()).then(operation);
			const barrier = result.then(() => undefined, () => undefined);
			active.set(key, barrier);
			void barrier.finally(() => {
				if (active.get(key) === barrier) active.delete(key);
			});
			return await result;
		},
	};
}
