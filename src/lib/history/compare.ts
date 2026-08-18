import type { DetectionExplanation, DetectionReplayTrace } from '@/lib/pipeline';

/** One technology that changed between two persisted detector runs. */
export type TechnologyChangeType = {
	readonly technologyId: string;
	readonly name: string;
	readonly before: DetectionExplanation;
	readonly after: DetectionExplanation;
	readonly fields: readonly ('version' | 'confidence' | 'evidence')[];
};

/** Structured comparison between an older and a newer replay trace. */
export type HistoryComparisonType = {
	readonly before: DetectionReplayTrace;
	readonly after: DetectionReplayTrace;
	readonly added: readonly DetectionExplanation[];
	readonly removed: readonly DetectionExplanation[];
	readonly changed: readonly TechnologyChangeType[];
	readonly unchanged: readonly DetectionExplanation[];
};

/** Compare emitted detector results from two replay traces. */
export function compare(before: DetectionReplayTrace, after: DetectionReplayTrace): HistoryComparisonType {
	const previous = new Map(before.explanations.map((item) => [item.technologyId, item]));
	const current = new Map(after.explanations.map((item) => [item.technologyId, item]));
	const added: DetectionExplanation[] = [];
	const removed: DetectionExplanation[] = [];
	const changed: TechnologyChangeType[] = [];
	const unchanged: DetectionExplanation[] = [];

	for (const item of after.explanations) {
		const old = previous.get(item.technologyId);
		if (!old) {
			added.push(item);
			continue;
		}

		const fields = getFields(old, item);
		if (fields.length) {
			changed.push({ technologyId: item.technologyId, name: item.name, before: old, after: item, fields });
		} else {
			unchanged.push(item);
		}
	}

	for (const item of before.explanations) {
		if (!current.has(item.technologyId)) removed.push(item);
	}

	return { before, after, added, removed, changed, unchanged };
}

/** Return the stable identity used by list selection and comparison controls. */
export function key(trace: DetectionReplayTrace): string {
	return trace.runId ?? `${trace.target.url}:${trace.analyzedAt}`;
}

/** Return the persisted result fields that changed for one emitted technology. */
function getFields(before: DetectionExplanation, after: DetectionExplanation): TechnologyChangeType['fields'] {
	const fields: Array<TechnologyChangeType['fields'][number]> = [];
	if (before.version !== after.version) fields.push('version');
	if (before.confidence.level !== after.confidence.level || before.confidence.value !== after.confidence.value) fields.push('confidence');
	if (before.evidenceCount !== after.evidenceCount || before.directEvidenceCount !== after.directEvidenceCount) fields.push('evidence');
	return fields;
}
