import type {
  DetectionReplaySummary,
  DetectionSessionKey,
  DetectionSessionSnapshot,
} from '../contracts/detection-session';

import { browser } from 'wxt/browser';
import type { VisibleTabIdentity, AnalysisEnrichmentState, AnalyzeVisibleTabOutput } from '../messaging';
import { filterReplayHistoryForAnalysis, isDetectionReplayTraceForAnalysis } from '../pipeline';

import {
  browserDetectionPersistence,
} from '../persistence';
import type {
  DetectionReplayStore,
  DetectionSnapshotReader,
} from '../persistence';
import {
  STORAGE_LIMITS,
  getContentSessionLifecycleKey,
  getAnalysisResponseKey,
  getDetectionOriginSnapshotKey,
  getDetectionSessionSnapshotKey,
} from '../storage/contracts';
import type { PopupVisibleRevision } from './view-model';

/** Handler invoked when storage publishes a matching snapshot revision. */
export type PopupSnapshotRevisionHandler = (snapshot: DetectionSessionSnapshot) => void;

/** Cleanup callback for removing the popup's storage change listener. */
export type PopupSnapshotUnsubscribe = () => void;

/** Persistence capabilities required to hydrate popup snapshot state. */
export type PopupSnapshotPersistence = Pick<
  DetectionSnapshotReader,
  'getSessionIndex' | 'getLatestSessionSnapshot' | 'getLatestOriginSnapshot'
> & Pick<DetectionReplayStore, 'getReplayTrace' | 'getReplayHistory'>;

/** Stored analysis source that can paint the popup before background analysis runs. */
export type PopupStoredAnalysisSource = 'session-snapshot' | 'origin-snapshot';

/**
 * Stored detector output that can be rendered during popup startup.
 *
 * Origin snapshots are the popup's startup stream because they carry revision,
 * enrichment, executor, and replay summary state. Analysis-snapshot response records stay as a lower-level persistence detail and no longer
 * drive first paint.
 */
export type PopupStoredAnalysisResult = {
  /** Storage path that produced the analysis shown in the popup. */
  readonly source: PopupStoredAnalysisSource;
  /** Popup-visible revision derived from storage state. */
  readonly revision: PopupVisibleRevision;
  /** Normalized analysis output safe for current popup rendering. */
  readonly analysis: AnalyzeVisibleTabOutput['analysis'];
  /** Snapshot revision used when the storage-backed stream already has state. */
  readonly snapshot?: DetectionSessionSnapshot;
  /** Optional content-owned lifecycle revision for the same exact session. */
  readonly lifecycleSnapshot?: DetectionSessionSnapshot;
  /** Latest replay trace for the stored analysis, when replay storage has one. */
  readonly replayTrace?: AnalyzeVisibleTabOutput['replayTrace'];
  /** Recent replay runs for the stored analysis origin. */
  readonly replayHistory?: AnalyzeVisibleTabOutput['replayHistory'];
};

/**
 * Read the best stored detector result for the active popup target.
 *
 * Incognito tabs skip persistent storage reads for the same reason they skip
 * writes: visible state should come from the live page command, not from durable
 * records that can outlive the private browsing context.
 */
export async function readStoredPopupAnalysis(
  identity: VisibleTabIdentity,
  persistence: PopupSnapshotPersistence = browserDetectionPersistence,
): Promise<PopupStoredAnalysisResult | null> {
  if (identity.incognito) {
    return null;
  }

  const storedSnapshot = await getStoredVisibleSnapshot(identity, persistence);
  if (
    !storedSnapshot ||
    !isSnapshotForActiveTab(identity, storedSnapshot.snapshot) ||
    !isDetectorStartupSnapshot(storedSnapshot.snapshot)
  ) {
    return null;
  }

  const replay = await readStoredReplayState(storedSnapshot.snapshot.analysis, persistence);
  const stored = {
    source: storedSnapshot.source,
    analysis: storedSnapshot.snapshot.analysis,
    snapshot: storedSnapshot.snapshot,
    ...(storedSnapshot.lifecycleSnapshot ? { lifecycleSnapshot: storedSnapshot.lifecycleSnapshot } : {}),
    ...replay,
  };
  return { ...stored, revision: createStoredPopupVisibleRevision(stored) };
}

type StoredVisibleSnapshot = {
	readonly source: PopupStoredAnalysisSource;
	readonly snapshot: DetectionSessionSnapshot;
  readonly lifecycleSnapshot?: DetectionSessionSnapshot;
};

/** Prefer exact session snapshots for the visible tab, falling back to old origin pointers. */
async function getStoredVisibleSnapshot(
  identity: VisibleTabIdentity,
  persistence: PopupSnapshotPersistence,
): Promise<StoredVisibleSnapshot | null> {
	const index = await persistence.getSessionIndex(identity.tabId);
  const exactSnapshots: StoredVisibleSnapshot[] = [];

	for (const entry of index.entries) {
		if (entry.key.frameId !== identity.frameId || entry.urlHash !== identity.urlHash) {
			continue;
		}

    const [snapshot, lifecycleSnapshot] = await Promise.all([
      persistence.getLatestSessionSnapshot(entry.key),
      getLatestContentSessionLifecycleSnapshot(entry.key),
    ]);
		if (snapshot && isSnapshotForActiveTab(identity, snapshot) && isDetectorStartupSnapshot(snapshot)) {
      exactSnapshots.push({
        source: 'session-snapshot',
        snapshot,
        ...(lifecycleSnapshot && isSnapshotForActiveTab(identity, lifecycleSnapshot)
          ? { lifecycleSnapshot }
          : {}),
      });
		}
	}

	const newestExactSnapshot = exactSnapshots
    .sort((left, right) =>
      getStoredVisibleSnapshotUpdatedAt(right) - getStoredVisibleSnapshotUpdatedAt(left) ||
      right.snapshot.revision - left.snapshot.revision,
    )[0];
	if (newestExactSnapshot) {
    return newestExactSnapshot;
	}

  const originSnapshot = await persistence.getLatestOriginSnapshot(identity.originHash);
	return originSnapshot ? { source: 'origin-snapshot', snapshot: originSnapshot } : null;
}

/**
 * Read replay data next to startup analysis so explanations survive popup reopen.
 *
 * Snapshots keep only a compact replay summary to avoid duplicating full traces
 * across every visible revision. The popup can still recover the newest full
 * trace and bounded history from the dedicated replay storage namespace before
 * the background service worker has to start a fresh analysis command.
 */
async function readStoredReplayState(
  analysis: AnalyzeVisibleTabOutput['analysis'],
  persistence: PopupSnapshotPersistence,
): Promise<Pick<PopupStoredAnalysisResult, 'replayTrace' | 'replayHistory'>> {
  const [replayTrace, replayHistory] = await Promise.all([
    persistence.getReplayTrace(analysis.url),
    persistence.getReplayHistory(analysis.url),
  ]);
  const matchingReplayTrace = replayTrace && isDetectionReplayTraceForAnalysis(replayTrace, analysis)
    ? replayTrace
    : undefined;
  const matchingReplayHistory = filterReplayHistoryForAnalysis(replayHistory, analysis);

  return {
    ...(matchingReplayTrace ? { replayTrace: matchingReplayTrace } : {}),
    ...(matchingReplayHistory.length ? { replayHistory: matchingReplayHistory } : {}),
  };
}

/** Return whether a compact snapshot replay summary explains the stored analysis. */
function isReplaySummaryForAnalysis(
  summary: DetectionReplaySummary | undefined,
  analysis: AnalyzeVisibleTabOutput['analysis'],
): summary is DetectionReplaySummary {
  return Boolean(
    summary &&
      summary.resultCount === analysis.results.length &&
      summary.analyzedAt === analysis.analyzedAt,
  );
}

/** Detector-owned or detection-bearing snapshots are safe as the first popup paint. */
function isDetectorStartupSnapshot(snapshot: DetectionSessionSnapshot): boolean {
  if (snapshot.source === 'background' || snapshot.source === 'cache') {
    return true;
  }

  return snapshot.detectionCount > 0;
}

/**
 * Convert stored popup state into the existing analysis response shape.
 *
 * Reusing `AnalyzeVisibleTabOutput` lets the popup keep one rendering path while
 * separating storage-first display from the later background command that starts
 * synchronization or observation work.
 */
export function createStoredPopupAnalysisOutput(stored: PopupStoredAnalysisResult): AnalyzeVisibleTabOutput {
  return {
    analysis: stored.revision.analysis,
    snapshot: { ...stored.revision.snapshot },
    ...(stored.revision.replayTrace ? { replayTrace: stored.revision.replayTrace } : {}),
    ...(stored.revision.replayHistory ? { replayHistory: stored.revision.replayHistory } : {}),
    ...(stored.revision.enrichment ? { enrichment: stored.revision.enrichment } : {}),
    ...(stored.revision.evidence ? { evidence: stored.revision.evidence } : {}),
  };
}

/** Convert stored snapshot state into the popup's revision model. */
export function createStoredPopupVisibleRevision(stored: Omit<PopupStoredAnalysisResult, 'revision'>): PopupVisibleRevision {
  const lifecycleSnapshot = stored.lifecycleSnapshot ?? stored.snapshot;
  const replaySummary = isReplaySummaryForAnalysis(stored.snapshot?.replaySummary, stored.analysis)
    ? stored.snapshot?.replaySummary
    : undefined;

  return {
    source: 'snapshot',
    analysis: stored.analysis,
    snapshot: {
      status: 'hit',
      key: getAnalysisResponseKey(stored.analysis.url),
      expiresAt: stored.analysis.analyzedAt + STORAGE_LIMITS.analysisTtlMs,
    },
    ...(stored.replayTrace ? { replayTrace: stored.replayTrace } : {}),
    ...(stored.replayHistory ? { replayHistory: stored.replayHistory } : {}),
    ...(replaySummary ? { replaySummary } : {}),
    ...(stored.snapshot?.matcherProgress ? { matcherProgress: stored.snapshot.matcherProgress } : {}),
    ...(stored.snapshot?.evidence ? { evidence: stored.snapshot.evidence } : {}),
    ...(lifecycleSnapshot ? {
      sessionSnapshotStatus: lifecycleSnapshot.status,
      sessionSnapshotSource: lifecycleSnapshot.source,
      enrichment: toAnalysisEnrichmentState(lifecycleSnapshot),
      updatedAt: lifecycleSnapshot.updatedAt,
    } : {}),
  };
}

/** Only exact visible-tab snapshots can update the open popup's visible current-tab result. */
export function isSnapshotForActiveTab(identity: VisibleTabIdentity, snapshot: DetectionSessionSnapshot): boolean {
	return (
		snapshot.key.tabId === identity.tabId &&
		snapshot.key.originHash === identity.originHash &&
		snapshot.urlHash === identity.urlHash
	);
}


/**
 * Subscribe the open popup to snapshot revisions for its visible tab.
 *
 * Storage becomes the receive stream: background or content writes a newer
 * origin snapshot, the browser emits a storage change, and the popup applies the
 * revision only when it still belongs to the visible tab identity.
 */
export function subscribeToPopupSnapshotRevisions(
  identity: VisibleTabIdentity,
  exactSessionKey: DetectionSessionKey | null,
  onRevision: PopupSnapshotRevisionHandler,
): PopupSnapshotUnsubscribe {
  const storageKeys = exactSessionKey
    ? [
      getDetectionSessionSnapshotKey(exactSessionKey),
      getContentSessionLifecycleKey(exactSessionKey),
    ]
    : [getDetectionOriginSnapshotKey(identity.originHash)];
  const listener = (changes: Record<string, { readonly newValue?: unknown }>, areaName: string): void => {
		if (areaName !== 'local') return;
    for (const storageKey of storageKeys) {
      const change = changes[storageKey];
      if (!change || !isDetectionSessionSnapshot(change.newValue)) continue;
      if (!isSnapshotForActiveTab(identity, change.newValue)) continue;
      onRevision(change.newValue);
      break;
    }
	};

  browser.storage.onChanged.addListener(listener);
  return () => browser.storage.onChanged.removeListener(listener);
}

/** Compare revisions without assuming all storage writes share one document id. */
export function isNewerSnapshotRevision(current: DetectionSessionSnapshot | null, next: DetectionSessionSnapshot): boolean {
  if (!current) return true;
  if (
    current.key.tabId === next.key.tabId &&
    current.key.frameId === next.key.frameId &&
    current.key.documentId === next.key.documentId
  ) {
    return next.revision > current.revision;
  }

  return next.updatedAt > current.updatedAt;
}

function toAnalysisEnrichmentState(snapshot: DetectionSessionSnapshot): AnalysisEnrichmentState | undefined {
  return {
    status: snapshot.enrichment.status,
    ...(snapshot.enrichment.completedAt ? { completedAt: snapshot.enrichment.completedAt } : {}),
    ...(snapshot.enrichment.reason ? { reason: snapshot.enrichment.reason } : {}),
  };
}

function getStoredVisibleSnapshotUpdatedAt(snapshot: StoredVisibleSnapshot): number {
	return Math.max(snapshot.snapshot.updatedAt, snapshot.lifecycleSnapshot?.updatedAt ?? 0);
}

async function getLatestContentSessionLifecycleSnapshot(
  key: DetectionSessionKey,
): Promise<DetectionSessionSnapshot | null> {
  const storageKey = getContentSessionLifecycleKey(key);
  const raw = await browser.storage.local.get(storageKey);
  const value = raw[storageKey];

  return isDetectionSessionSnapshot(value) ? value : null;
}

function isDetectionSessionSnapshot(value: unknown): value is DetectionSessionSnapshot {
  return (
    typeof value === 'object' &&
    value !== null &&
    'schemaVersion' in value &&
    'key' in value &&
    'urlHash' in value &&
    'hostname' in value &&
    'analysis' in value &&
    'detectionCount' in value &&
    'updatedAt' in value
  );
}
