import type {
	DetectionSessionKey,
	DetectionSessionSnapshot,
	DetectionSessionStatus,
} from '../contracts/detection-session';
import type { AnalysisStatus } from '../detection/types';
import type { VisibleTabIdentity } from '../contracts/analysis';
import type { DetectionReplayTrace } from '../pipeline/replay';
import type { MatcherJobRecord } from '../matcher';

/** Pointer from a browser tab to one known page-session snapshot. */
export interface DetectionSessionIndexEntry {
	readonly key: DetectionSessionKey;
	readonly urlHash: string;
	readonly status: DetectionSessionStatus;
	readonly updatedAt: number;
}

/** Stored list of known detection sessions for one browser tab. */
export interface DetectionSessionIndexRecord {
	readonly tabId: number;
	readonly entries: readonly DetectionSessionIndexEntry[];
	readonly updatedAt: number;
}

/** Result returned after attempting to persist one detection snapshot revision. */
export interface DetectionSessionSnapshotWriteResult {
	readonly accepted: boolean;
	readonly sessionStorageKey: string;
	readonly originStorageKey: string;
	readonly snapshot: DetectionSessionSnapshot;
	readonly rejectedByRevision?: number;
}

/** Read-only snapshot capabilities consumed by popup and background application code. */
export interface DetectionSnapshotReader {
	getBestVisibleSnapshot(identity: VisibleTabIdentity): Promise<DetectionSessionSnapshot | null>;
	getSessionIndex(tabId: number): Promise<DetectionSessionIndexRecord>;
	getLatestOriginSnapshot(originHash: string): Promise<DetectionSessionSnapshot | null>;
	getLatestSessionSnapshot(key: DetectionSessionKey): Promise<DetectionSessionSnapshot | null>;
}

/** Snapshot write capability consumed by runtime owners that publish revisions. */
export interface DetectionSnapshotWriter {
	saveSnapshot(snapshot: DetectionSessionSnapshot): Promise<DetectionSessionSnapshotWriteResult>;
}

/** Lifecycle-only snapshot operations used when a browser tab changes documents or closes. */
export interface DetectionSnapshotLifecycleStore {
	markTabSnapshots(
		tabId: number,
		status: Extract<DetectionSessionStatus, 'stale' | 'stopped'>,
		reason: string,
	): Promise<readonly DetectionSessionSnapshot[]>;
	removeSessionIndex(tabId: number): Promise<void>;
}

/** Full snapshot persistence port implemented by browser storage infrastructure. */
export type DetectionSnapshotStore = DetectionSnapshotReader
	& DetectionSnapshotWriter
	& DetectionSnapshotLifecycleStore;

/** Replay persistence capabilities kept separate from snapshot semantics. */
export interface DetectionReplayStore {
	getReplayTrace(url: string): Promise<DetectionReplayTrace | null>;
	getReplayHistory(url: string): Promise<DetectionReplayTrace[]>;
	saveReplayTrace(trace: DetectionReplayTrace): Promise<DetectionReplayTrace>;
}

/** Source of durable snapshot revisions for open UI surfaces. */
export interface DetectionSnapshotRevisionSource {
	subscribeOriginSnapshot(
		originHash: string,
		onRevision: (snapshot: DetectionSessionSnapshot) => void,
	): () => void;
}

/** Maintenance/status capabilities exposed by persistence infrastructure. */
export interface DetectionPersistenceMaintenance {
	clearStoredData(): Promise<number>;
	getStatus(): Promise<AnalysisStatus>;
}

/** Matcher-job lifecycle persistence used by background orchestration. */
export interface MatcherJobStore {
	saveMatcherJob(record: MatcherJobRecord): Promise<MatcherJobRecord>;
	updateMatcherJob(
		jobId: string,
		patch: Partial<Omit<MatcherJobRecord, 'jobId' | 'tabId' | 'expectedUrl' | 'target' | 'createdAt'>>,
	): Promise<MatcherJobRecord | null>;
}

/** Persistence capabilities required by the background analysis runtime. */
export type BackgroundDetectionPersistence = DetectionSnapshotReader
	& DetectionSnapshotWriter
	& DetectionReplayStore
	& DetectionPersistenceMaintenance
	& MatcherJobStore;
