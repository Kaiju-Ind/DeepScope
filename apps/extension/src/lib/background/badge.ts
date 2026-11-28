/** What the toolbar button should show for one tab. */
export interface BadgeState {
	/** Number of detected technologies; zero clears the badge. */
	readonly count: number;
	/** Most useful finding, shown in the button's tooltip. */
	readonly finding?: string;
}

/** Applies one badge state to the browser. */
export type ApplyBadge = (tabId: number, state: BadgeState) => Promise<void>;

/** Serialized, latest-wins badge writes for every tab. */
export interface BadgeWriter {
	/** Show `state` for `tabId`, replacing any write still waiting for that tab. */
	set(tabId: number, state: BadgeState): Promise<void>;
	/** Clear the badge for `tabId`, for example when the tab navigates. */
	clear(tabId: number): Promise<void>;
	/** Forget a closed tab without touching the browser. */
	forget(tabId: number): void;
}

/** Per-tab write chain: the promise of the write in progress and the newest state waiting behind it. */
interface TabQueue {
	running: Promise<void>;
	next: BadgeState | undefined;
}

/**
 * Create the single owner of toolbar badge writes.
 *
 * Badge updates are asynchronous browser calls that can complete out of order.
 * Without ordering, a clear sent on navigation can land before an older count
 * that was still in flight, leaving the previous page's count on the new page.
 * Each tab therefore has one write chain: a new state replaces any state still
 * waiting, and only the newest waiting state is applied after the current write
 * finishes. Failures are reported and never stop later writes.
 */
export function createBadgeWriter(apply: ApplyBadge, onError?: (tabId: number, error: unknown) => void): BadgeWriter {
	const queues = new Map<number, TabQueue>();

	/** Keep one writer per tab and replace only its pending state, so an older slow browser call cannot finish last. */
	function enqueue(tabId: number, state: BadgeState): Promise<void> {
		const existing = queues.get(tabId);
		if (existing) {
			existing.next = state;
			return existing.running;
		}

		const queue: TabQueue = { running: Promise.resolve(), next: state };
		queues.set(tabId, queue);
		queue.running = (async () => {
			while (queue.next) {
				const current = queue.next;
				queue.next = undefined;
				try {
					await apply(tabId, current);
				} catch (error) {
					onError?.(tabId, error);
				}
			}
			if (queues.get(tabId) === queue) queues.delete(tabId);
		})();
		return queue.running;
	}

	return {
		set: enqueue,
		/** Queue an empty badge through the same per-tab ordering as analysis counts. */
		clear: (tabId) => enqueue(tabId, { count: 0 }),
		/** Drop queued badge work for a retired tab; an already submitted browser call cannot be canceled here. */
		forget(tabId) {
			const queue = queues.get(tabId);
			if (queue) queue.next = undefined;
		},
	};
}

/** Text shown on the button: nothing for zero, capped at `99+`. */
export function badgeText(count: number): string {
	return count <= 0 ? '' : count > 99 ? '99+' : String(count);
}
