import { browser } from 'wxt/browser';

import {
	clearStoredDetectionData,
	getBestVisibleDetectionSessionSnapshot,
	getCachedReplayTrace,
	getCachedReplayTraceHistory,
	getDetectionSessionIndex,
	getLatestDetectionOriginSnapshot,
	getLatestDetectionSessionSnapshot,
	getStatus,
	isDetectionSessionSnapshot,
	markDetectionSessionSnapshotsForTab,
	removeDetectionSessionIndex,
	saveDetectionSessionSnapshot,
	saveMatcherJobRecord,
	saveReplayTrace,
	updateMatcherJobRecord,
} from '../storage';
import { getDetectionOriginSnapshotKey } from '../storage/contracts';
import type {
	DetectionPersistenceMaintenance,
	DetectionReplayStore,
	DetectionSnapshotRevisionSource,
	DetectionSnapshotStore,
} from './ports';

/** Browser-storage implementation of the application-facing snapshot port. */
export const browserDetectionSnapshotStore: DetectionSnapshotStore = {
	getBestVisibleSnapshot: getBestVisibleDetectionSessionSnapshot,
	getSessionIndex: getDetectionSessionIndex,
	getLatestOriginSnapshot: getLatestDetectionOriginSnapshot,
	getLatestSessionSnapshot: getLatestDetectionSessionSnapshot,
	saveSnapshot: saveDetectionSessionSnapshot,
	markTabSnapshots: markDetectionSessionSnapshotsForTab,
	removeSessionIndex: removeDetectionSessionIndex,
};

/** Browser-storage implementation of replay persistence. */
export const browserDetectionReplayStore: DetectionReplayStore = {
	getReplayTrace: getCachedReplayTrace,
	getReplayHistory: getCachedReplayTraceHistory,
	saveReplayTrace,
};

/** Browser storage-change adapter used by UI surfaces that observe snapshot revisions. */
export const browserDetectionSnapshotRevisionSource: DetectionSnapshotRevisionSource = {
	subscribeOriginSnapshot(originHash, onRevision) {
		const storageKey = getDetectionOriginSnapshotKey(originHash);
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
} as const;
