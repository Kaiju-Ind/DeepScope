import type { DetectionSessionSnapshot, DetectionSessionStatus } from "../session.ts";

import { getDetectionSessionIndex } from './sessions.ts';
import { reviseDetectionSessionSnapshot } from './write.ts';

/**
 * Mark every active snapshot for a tab with a terminal lifecycle state.
 *
 * Navigation and tab removal can happen while the background has no reliable
 * in-memory session. The tab index lets the lifecycle listener update stored
 * snapshots directly so a side panel does not keep rendering an observing session for
 * a document that can no longer produce content events.
 */
export async function markDetectionSessionSnapshotsForTab(
	tabId: number,
	status: Extract<DetectionSessionStatus, 'stale' | 'stopped'>,
	reason: string,
): Promise<readonly DetectionSessionSnapshot[]> {
	const index = await getDetectionSessionIndex(tabId);
	const marked: DetectionSessionSnapshot[] = [];

	for (const entry of index.entries) {
		const result = await reviseDetectionSessionSnapshot(entry.key, (snapshot) => {
			if (snapshot.status === status || (snapshot.status === 'stopped' && status === 'stale')) return null;
			const updatedAt = Date.now();
			return {
				...snapshot,
				status,
				source: 'background',
				updatedAt,
				enrichment: { ...snapshot.enrichment, updatedAt, reason },
			};
		});
		if (result) marked.push(result.snapshot);
	}

	return marked;
}
