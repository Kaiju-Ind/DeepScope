import type {
	EvidenceBatch,
	EvidenceEntry,
	EvidenceTechnologySummary,
} from './types';

/** Filter used when reading evidence from repository state. */
export interface EvidenceRepositoryFilter {
	/** Limit results to one analyzed target URL. */
	readonly targetUrl?: string;
	/** Limit results to one technology. */
	readonly technologyId?: string;
	/** Limit results to direct or relationship-derived evidence. */
	readonly direct?: boolean;
}

/** Immutable evidence records owned by the functional repository core. */
export interface EvidenceRepositoryState {
	/** Stored evidence in insertion order. Query helpers return deterministic sorted copies. */
	readonly entries: readonly EvidenceEntry[];
}

/** Result of adding one entry to immutable repository state. */
export interface AddEvidenceEntryResult {
	/** Next repository state. */
	readonly state: EvidenceRepositoryState;
	/** Defensive copy of the entry accepted into the next state. */
	readonly entry: EvidenceEntry;
}

/** Result of adding a batch to immutable repository state. */
export interface AddEvidenceBatchResult {
	/** Next repository state. */
	readonly state: EvidenceRepositoryState;
	/** Number of entries copied into the next state. */
	readonly addedCount: number;
}

/**
 * Mutable-identity adapter around the functional evidence repository core.
 *
 * Runtime callers can keep the convenient method API while all storage, filtering,
 * ordering, and summary rules remain available as pure state transformations.
 */
export interface EvidenceRepository {
	/** Add one evidence entry and return a defensive copy of the stored record. */
	add(entry: EvidenceEntry): EvidenceEntry;
	/** Add every entry from a batch and return the number of records stored. */
	addBatch(batch: EvidenceBatch): number;
	/** List stored evidence in deterministic replay order. */
	list(filter?: EvidenceRepositoryFilter): readonly EvidenceEntry[];
	/** Summarize stored evidence by technology without computing final detections. */
	summarizeByTechnology(filter?: EvidenceRepositoryFilter): readonly EvidenceTechnologySummary[];
	/** Remove all entries from the repository. */
	clear(): void;
}

interface MutableEvidenceTechnologySummary {
	technologyId: string;
	entryCount: number;
	directCount: number;
	relationshipCount: number;
	maxConfidence: number;
}

/** Create isolated immutable evidence repository state from caller-owned entries. */
export function createEvidenceRepositoryState(
	initialEntries: readonly EvidenceEntry[] = [],
): EvidenceRepositoryState {
	return { entries: initialEntries.map(cloneEvidenceEntry) };
}

/** Add one entry without mutating the input state or retaining caller-owned references. */
export function addEvidenceEntry(
	state: EvidenceRepositoryState,
	entry: EvidenceEntry,
): AddEvidenceEntryResult {
	const stored = cloneEvidenceEntry(entry);
	return {
		state: { entries: [...state.entries, stored] },
		entry: cloneEvidenceEntry(stored),
	};
}

/** Add one batch without mutating the input state or retaining caller-owned references. */
export function addEvidenceBatch(
	state: EvidenceRepositoryState,
	batch: EvidenceBatch,
): AddEvidenceBatchResult {
	if (batch.entries.length === 0) {
		return { state, addedCount: 0 };
	}

	const storedEntries = batch.entries.map(cloneEvidenceEntry);
	return {
		state: { entries: [...state.entries, ...storedEntries] },
		addedCount: storedEntries.length,
	};
}

/** List deterministic defensive copies from immutable repository state. */
export function listEvidenceEntries(
	state: EvidenceRepositoryState,
	filter: EvidenceRepositoryFilter = {},
): readonly EvidenceEntry[] {
	return state.entries
		.filter((entry) => matchesFilter(entry, filter))
		.sort(compareEvidenceEntries)
		.map(cloneEvidenceEntry);
}

/** Summarize immutable repository state without choosing final detector confidence. */
export function summarizeEvidenceByTechnology(
	state: EvidenceRepositoryState,
	filter: EvidenceRepositoryFilter = {},
): readonly EvidenceTechnologySummary[] {
	const summaries = new Map<string, MutableEvidenceTechnologySummary>();
	for (const entry of state.entries) {
		if (!matchesFilter(entry, filter)) {
			continue;
		}

		const summary = summaries.get(entry.technologyId) ?? {
			technologyId: entry.technologyId,
			entryCount: 0,
			directCount: 0,
			relationshipCount: 0,
			maxConfidence: 0,
		};
		summary.entryCount += 1;
		if (entry.direct) {
			summary.directCount += 1;
		} else {
			summary.relationshipCount += 1;
		}
		summary.maxConfidence = Math.max(summary.maxConfidence, entry.confidence);
		summaries.set(entry.technologyId, summary);
	}

	return [...summaries.values()].sort((left, right) =>
		left.technologyId.localeCompare(right.technologyId),
	);
}

/** Return empty repository state while leaving the previous state untouched. */
export function clearEvidenceRepositoryState(
	_state: EvidenceRepositoryState,
): EvidenceRepositoryState {
	return createEvidenceRepositoryState();
}

/**
 * Create an isolated mutable-identity adapter around immutable repository state.
 *
 * The only mutation is replacement of the adapter-owned state reference. Domain
 * operations remain pure and can be tested without constructing this wrapper.
 */
export function createEvidenceRepository(
	initialEntries: readonly EvidenceEntry[] = [],
): EvidenceRepository {
	let state = createEvidenceRepositoryState(initialEntries);

	return {
		add(entry) {
			const result = addEvidenceEntry(state, entry);
			state = result.state;
			return result.entry;
		},
		addBatch(batch) {
			const result = addEvidenceBatch(state, batch);
			state = result.state;
			return result.addedCount;
		},
		list(filter) {
			return listEvidenceEntries(state, filter);
		},
		summarizeByTechnology(filter) {
			return summarizeEvidenceByTechnology(state, filter);
		},
		clear() {
			state = clearEvidenceRepositoryState(state);
		},
	};
}

function matchesFilter(entry: EvidenceEntry, filter: EvidenceRepositoryFilter): boolean {
	return (filter.targetUrl === undefined || entry.target.url === filter.targetUrl)
		&& (filter.technologyId === undefined || entry.technologyId === filter.technologyId)
		&& (filter.direct === undefined || entry.direct === filter.direct);
}

function compareEvidenceEntries(left: EvidenceEntry, right: EvidenceEntry): number {
	return left.observedAt - right.observedAt || left.id.localeCompare(right.id);
}

function cloneEvidenceEntry(entry: EvidenceEntry): EvidenceEntry {
	return {
		...entry,
		target: { ...entry.target },
		observation: entry.observation ? { ...entry.observation } : undefined,
		attributes: entry.attributes ? { ...entry.attributes } : undefined,
	};
}
