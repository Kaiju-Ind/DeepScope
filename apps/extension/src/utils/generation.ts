/** Keyed generation tracker for rejecting stale asynchronous work without retaining retired keys. */
export interface Generation<Key> {
	/** Capture the current generation, creating one when this key has no live work yet. */
	capture(key: Key): number;
	/** Forget the live generation so every previously captured value becomes stale. */
	invalidate(key: Key): void;
	/** Return whether a captured generation still owns the key. */
	isCurrent(key: Key, value: number): boolean;
}

/**
 * Create a keyed stale-work generation tracker.
 *
 * Invalidated keys are deleted immediately. A monotonically increasing token
 * ensures that reusing the same key later cannot make an old asynchronous task
 * current again, while the internal map remains bounded by currently live keys.
 */
export function create<Key>(): Generation<Key> {
	const values = new Map<Key, number>();
	let sequence = 0;

	return {
		/** Reuse a live key's generation or allocate a new sequence value after its prior generation was invalidated. */
		capture(key) {
			const current = values.get(key);
			if (current !== undefined) return current;
			sequence += 1;
			values.set(key, sequence);
			return sequence;
		},
		/** Retire the key's current token so later work cannot accept an earlier captured generation. */
		invalidate(key) {
			values.delete(key);
		},
		/** Accept a captured token only while that exact key and generation remain registered. */
		isCurrent(key, value) {
			return values.get(key) === value;
		},
	};
}
