import { browser } from 'wxt/browser';

import { clearStoredDetectionData, getBestVisibleDetectionSessionSnapshot, getCachedReplayTrace, getCachedReplayTraceHistory, getDetectionSessionIndex, getLatestDetectionOriginSnapshot, getLatestDetectionSessionSnapshot, getStatus, isDetectionSessionSnapshot, markDetectionSessionSnapshotsForTab, removeTabSessions, saveDetectionSessionSnapshot, saveMatcherJobRecord, saveReplayTrace, updateMatcherJobRecord } from "../storage/index.ts";
import { getDetectionOriginSnapshotKey } from "../storage/contracts.ts";
import type { BackgroundDetectionPersistence, DetectionPersistenceMaintenance, DetectionReplayStore, DetectionSnapshotRevisionSource, DetectionSnapshotStore } from "./ports.ts";

/** Browser-storage implementation of the application-facing snapshot port. */
export const browserDetectionSnapshotStore: DetectionSnapshotStore = {
	getBestVisibleSnapshot: getBestVisibleDetectionSessionSnapshot,
	getSessionIndex: getDetectionSessionIndex,
	getLatestOriginSnapshot: getLatestDetectionOriginSnapshot,
	getLatestSessionSnapshot: getLatestDetectionSessionSnapshot,
	saveSnapshot: saveDetectionSessionSnapshot,
	markTabSnapshots: markDetectionSessionSnapshotsForTab,
	removeSessionIndex: removeTabSessions,
};

/** Browser-storage implementation of replay persistence. */
export const browserDetectionReplayStore: DetectionReplayStore = {
	getReplayTrace: getCachedReplayTrace,
	getReplayHistory: getCachedReplayTraceHistory,
	saveReplayTrace,
};

/** Browser storage-change adapter used by UI surfaces that observe snapshot revisions. */
export const browserDetectionSnapshotRevisionSource: DetectionSnapshotRevisionSource = {
	/** Observe one origin snapshot in local storage and return ownership of subscription cleanup to the consumer. */
	subscribeOriginSnapshot(originHash, onRevision) {
		const storageKey = getDetectionOriginSnapshotKey(originHash);
		/** Ignore other storage areas and malformed values before delivering a new origin snapshot revision. */
		const listener = (changes: Record<string, { readonly newValue?: unknown }>, areaName: string): void => {
			if (areaName !== 'local') return;
			const change = changes[storageKey];
			if (!change || !isDetectionSessionSnapshot(change.newValue)) return;
			onRevision(change.newValue);
		};

		browser.storage.onChanged.addListener(listener);
		return () => browser.storage.onChanged.removeListener(listener);
	},
};

/** Browser implementation of detector persistence maintenance/status operations. */
export const browserDetectionPersistenceMaintenance: DetectionPersistenceMaintenance = {
	clearStoredData: clearStoredDetectionData,
	getStatus,
};

/** Browser implementation of matcher-job persistence. */
export const browserMatcherJobStore = {
	saveMatcherJob: saveMatcherJobRecord,
	updateMatcherJob: updateMatcherJobRecord,
} as const;

/** Shared browser persistence facade used only by runtime composition roots. */
export const browserDetectionPersistence = {
	...browserDetectionSnapshotStore,
	...browserDetectionReplayStore,
	...browserDetectionPersistenceMaintenance,
	...browserMatcherJobStore,
} as const satisfies BackgroundDetectionPersistence;
