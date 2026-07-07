import { vi } from 'vitest';

/** Stored values for the in-memory browser storage mock. */
export type BrowserStorageValues = Map<string, unknown>;

/**
 * Minimal browser storage area used by tests that import modules reading
 * `browser.storage.local` from `wxt/browser`.
 *
 * The surface mirrors the shapes this repo currently uses: string keys, string
 * key arrays, object defaults, and `null` for all values. Keeping those forms in
 * one mock prevents each test from inventing a slightly different storage API.
 */
export type MockBrowserStorageArea = {
	/** Read one key, many keys, defaulted keys, or all values. */
	get: ReturnType<typeof vi.fn>;
	/** Merge a record of values into the in-memory store. */
	set: ReturnType<typeof vi.fn>;
	/** Remove one key or many keys from the in-memory store. */
	remove: ReturnType<typeof vi.fn>;
};

/** Listener shape used by `browser.storage.onChanged` tests. */
export type MockBrowserStorageChangeListener = (
	changes: Record<string, { readonly newValue?: unknown; readonly oldValue?: unknown }>,
	areaName: string,
) => void;

/** Browser-like storage change event used by popup streaming tests. */
export type MockBrowserStorageChangeEvent = {
	/** Register a storage change listener. */
	addListener: ReturnType<typeof vi.fn>;
	/** Remove a storage change listener. */
	removeListener: ReturnType<typeof vi.fn>;
	/** Emit a storage change event to all registered listeners. */
	emit: (changes: Record<string, { readonly newValue?: unknown; readonly oldValue?: unknown }>, areaName?: string) => void;
};

/** Test harness returned by `createMockBrowserStorageArea`. */
export type MockBrowserStorageHarness = {
	/** Browser-like storage area passed to `wxt/browser` mocks. */
	local: MockBrowserStorageArea;
	/** Mutable backing store used for assertions that need to inspect persistence. */
	values: BrowserStorageValues;
};

type MockStorageGetKey = string | string[] | Record<string, unknown> | null | undefined;

type MockStorageRemoveKey = string | string[];

/**
 * Build an in-memory `browser.storage.local` mock.
 *
 * The mock intentionally behaves like Chrome storage for the key forms used by
 * the extension: `get(null)` returns every key, `get(['a'])` returns a partial
 * record, and `get({ a: defaultValue })` falls back to the provided default when
 * the key has not been stored.
 */
export function createMockBrowserStorageArea(
	initialValues: Record<string, unknown> = {},
): MockBrowserStorageHarness {
	const values = new Map<string, unknown>(Object.entries(initialValues));
	const local = {
		get: vi.fn(async (key?: MockStorageGetKey) => {
			if (key === null || key === undefined) {
				return Object.fromEntries(values.entries());
			}

			if (Array.isArray(key)) {
				return Object.fromEntries(key.map((item) => [item, values.get(item)]));
			}

			if (typeof key === 'object') {
				return Object.fromEntries(
					Object.entries(key).map(([item, fallback]) => [
						item,
						values.has(item) ? values.get(item) : fallback,
					]),
				);
			}

			return { [key]: values.get(key) };
		}),
		set: vi.fn(async (items: Record<string, unknown>) => {
			for (const [key, value] of Object.entries(items)) {
				values.set(key, value);
			}
		}),
		remove: vi.fn(async (key: MockStorageRemoveKey) => {
			for (const item of Array.isArray(key) ? key : [key]) {
				values.delete(item);
			}
		}),
	} satisfies MockBrowserStorageArea;

	return { local, values };
}


/**
 * Build the storage change surface needed by popup snapshot streaming tests.
 *
 * Browser storage delivers one event fan-out for every extension context. The
 * helper keeps listener registration observable while letting tests emit only
 * the records that matter for a specific popup identity.
 */
export function createMockBrowserStorageChangeEvent(): MockBrowserStorageChangeEvent {
	const listeners = new Set<MockBrowserStorageChangeListener>();
	const onChanged = {
		addListener: vi.fn((listener: MockBrowserStorageChangeListener) => {
			listeners.add(listener);
		}),
		removeListener: vi.fn((listener: MockBrowserStorageChangeListener) => {
			listeners.delete(listener);
		}),
		emit(changes: Record<string, { readonly newValue?: unknown; readonly oldValue?: unknown }>, areaName = 'local') {
			for (const listener of listeners) {
				listener(changes, areaName);
			}
		},
	} satisfies MockBrowserStorageChangeEvent;

	return onChanged;
}
