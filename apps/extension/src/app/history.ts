import { createResource } from 'solid-js';

import type { HistoryPageType } from './context';

/** Read retained runs only while their ordinary tab still owns the History page. */
export function createRetainedHistory(panel: Pick<HistoryPageType, 'visibleTabIdentity' | 'getReplayHistory'>) {
	const target = () => {
		const identity = panel.visibleTabIdentity();
		return identity && !identity.incognito ? identity : null;
	};
	const [stored, { refetch }] = createResource(target, async (identity) => ({
		target: identity,
		runs: await panel.getReplayHistory(identity),
	}));

	// A resource can retain its previous value during a new request or when disabled.
	// Bind results to their requesting tab so old runs never paint another tab.
	return {
		runs: () => {
			const current = target();
			if (!current) return undefined;
			const result = stored();
			return result?.target === current ? result.runs : undefined;
		},
		loading: () => Boolean(target()) && stored.loading,
		refetch,
	};
}
