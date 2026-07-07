import type {
	EvidenceBatch,
	EvidenceEntry,
	EvidenceTechnologySummary,
} from './types';

/** Filter used when reading evidence from the in-memory repository. */
export interface EvidenceRepositoryFilter {
	/** Limit results to one analyzed target URL. */
	targetUrl?: string;
	/** Limit results to one technology. */
	technologyId?: string;
	/** Limit results to direct or relationship-derived evidence. */
	direct?: boolean;
}

/**
 * In-memory evidence repository contract used by tests and future pipeline work.
 *
 * The repository is deliberately small and runtime-agnostic. It gives the next
 * event pipeline stages somewhere to accumulate evidence without choosing a
 * browser storage format, replay log format, or candidate confidence algorithm.
 */
export interface EvidenceRepository {
	/** Add one evidence entry and return a defensive copy of the stored record. */
	add(entry: EvidenceEntry): EvidenceEntry;
	/** Add every entry from a batch and return the number of records stored. */
	addBatch(batch: EvidenceBatch): number;
	/** List stored evidence in deterministic replay order. */
	list(filter?: EvidenceRepositoryFilter): EvidenceEntry[];
	/** Summarize stored evidence by technology without computing final detections. */
	summarizeByTechnology(filter?: EvidenceRepositoryFilter): EvidenceTechnologySummary[];
	/** Remove all entries from the repository. */
	clear(): void;
}

/** Create an isolated in-memory evidence repository. */
export function createEvidenceRepository(
	initialEntries: readonly EvidenceEntry[] = [],
): EvidenceRepository {
	const repository = new InMemoryEvidenceRepository();
	for (const entry of initialEntries) {
		repository.add(entry);
	}

	return repository;
}

class InMemoryEvidenceRepository implements EvidenceRepository {
	#entries: EvidenceEntry[] = [];

	add(entry: EvidenceEntry): EvidenceEntry {
		const stored = cloneEvidenceEntry(entry);
		this.#entries.push(stored);
		return cloneEvidenceEntry(stored);
	}

	addBatch(batch: EvidenceBatch): number {
		for (const entry of batch.entries) {
			this.add(entry);
		}

		return batch.entries.length;
	}

	list(filter: EvidenceRepositoryFilter = {}): EvidenceEntry[] {
		return this.#entries
			.filter((entry) => matchesFilter(entry, filter))
			.sort(compareEvidenceEntries)
			.map(cloneEvidenceEntry);
	}

	summarizeByTechnology(filter: EvidenceRepositoryFilter = {}): EvidenceTechnologySummary[] {
		const summaries = new Map<string, EvidenceTechnologySummary>();
		for (const entry of this.#entries) {
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

	clear(): void {
		this.#entries = [];
	}
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
