import type { BackgroundDetectionPersistence } from '../persistence';

/**
 * Time a closed tab's cleanup waits before its second pass. A content script's
 * last lifecycle write can still be in flight when its tab closes; the browser
 * commits or drops it well within this.
 */
export const CONTENT_WRITE_GRACE_MS = 1_500;

/** How many closed tab ids are remembered. Browsers do not reuse a tab id within a session. */
const MAX_CLOSED_TABS = 1_024;

/**
 * Snapshot writes keyed by the tab that owns them.
 *
 * A tab can close while one of its scans is part way through a snapshot write.
 * Its cleanup then removes the session index, and the write recreates it. This
 * refuses writes for a tab once it has closed and lets cleanup wait for the
 * writes that started before, so it can run again after they land.
 */
export interface TabWrites {
	/** Refuse later writes for the tab. Call before cleanup starts. */
	close(tabId: number): void;
	/** Resolve once the tab's writes that started before `close` have settled, plus the content grace. */
	settled(tabId: number): Promise<void>;
	/** Wrap persistence so each snapshot write is refused after close and tracked until it settles. */
	guard<Persistence extends BackgroundDetectionPersistence>(persistence: Persistence): Persistence;
}

export function create(graceMs = CONTENT_WRITE_GRACE_MS): TabWrites {
	const closed = new Set<number>();
	const inFlight = new Map<number, Set<Promise<unknown>>>();

	function track<Value>(tabId: number, write: Promise<Value>): Promise<Value> {
		const writes = inFlight.get(tabId) ?? new Set();
		inFlight.set(tabId, writes);
		writes.add(write);
		void write.catch(() => undefined).finally(() => {
			writes.delete(write);
			if (writes.size === 0 && inFlight.get(tabId) === writes) inFlight.delete(tabId);
		});
		return write;
	}

	return {
		close(tabId) {
			closed.delete(tabId);
			closed.add(tabId);
			if (closed.size > MAX_CLOSED_TABS) closed.delete(closed.values().next().value!);
		},
		async settled(tabId) {
			await Promise.allSettled([...inFlight.get(tabId) ?? []]);
			await new Promise((resolve) => setTimeout(resolve, graceMs));
		},
		guard(persistence) {
			return {
				...persistence,
				saveSnapshot(snapshot) {
					const tabId = snapshot.key.tabId;
					if (closed.has(tabId)) {
						return Promise.resolve({
							accepted: false,
							sessionStorageKey: '',
							originStorageKey: '',
							snapshot,
						});
					}
					return track(tabId, persistence.saveSnapshot(snapshot));
				},
			};
		},
	};
}
