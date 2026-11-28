import type { EvidenceCandidate } from "../types.ts";
import type { EvidenceEntry } from "../../evidence/index.ts";
import type { ObservationTarget, ObservationAttributes } from "../../observations/index.ts";

/** Detach candidate-owned arrays and nested evidence before refinement mutates its accepted set. */
export function cloneCandidate(candidate: EvidenceCandidate): EvidenceCandidate {
	return {
		...candidate,
		target: cloneTarget(candidate.target),
		technology: {
			...candidate.technology,
			categories: [...candidate.technology.categories],
		},
		versions: [...candidate.versions],
		kinds: [...candidate.kinds],
		evidence: candidate.evidence.map(cloneEvidenceEntry),
	};
}

/** Copy nested target, observation and attributes so refinement results do not share their caller's mutable records. */
function cloneEvidenceEntry(entry: EvidenceEntry): EvidenceEntry {
	return {
		...entry,
		target: cloneTarget(entry.target),
		observation: entry.observation ? { ...entry.observation } : undefined,
		attributes: cloneAttributes(entry.attributes),
	};
}

/** Give the refined batch its own target record while retaining all target fields. */
export function cloneTarget(target: ObservationTarget): ObservationTarget {
	return { ...target };
}

/** Copy present evidence metadata without turning absent attributes into an empty record. */
function cloneAttributes(attributes: EvidenceEntry['attributes']): ObservationAttributes | undefined {
	return attributes ? { ...attributes } : undefined;
}
