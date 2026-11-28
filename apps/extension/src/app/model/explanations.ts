import type { ConfidenceScore, Evidence } from "@deepscope/detection/types";
import type { DetectionExplanation, DetectionExplanationEvidenceSummary, DetectionReplayTrace } from "@deepscope/detection/pipeline";
import * as dictionary from '@deepscope/detection/observations/dictionary';

/**
 * Panel-ready explanation summary for one detection card.
 *
 * The view model keeps this smaller than `DetectionExplanation` so Solid
 * components do not need to know about the full replay trace schema.
 */
export type DetectionExplanationSummary = {
	/** Technology id this explanation belongs to. */
	technologyId: string;
	/** Short headline rendered above the explanation reasons. */
	headline: string;
	/** Final confidence value and label copied for UI copy. */
	confidence: ConfidenceScore;
	/** Bounded explanation phrases safe for side panel rendering. */
	reasons: readonly string[];
	/** Number of public evidence entries behind the detection. */
	evidenceCount: number;
	/** Most useful public evidence kind to summarize in compact card copy. */
	primaryEvidenceKind: string | null;
	/** Whether the detection was inferred through graph relationships. */
	inferred: boolean;
	/** Public evidence rows rendered below explanation reasons. */
	evidence: readonly EvidencePreview[];
};

/** Public evidence row shown inside a technology card. */
export type EvidencePreview = {
	/** Detector surface that supplied the proof. */
	kind: string;
	/** Bounded value that matched the detector rule, when available. */
	matchedValue?: string;
	/** Version captured from this evidence row, when available. */
	version?: string;
	/** Relationship source for inferred evidence, when available. */
	sourceTechnologyId?: string;
	/** Observation lookup key, such as a header name, meta name, global path, or storage key. */
	observationKey?: string;
	/** Scalar observation context that helps explain property-based evidence. */
	attributes?: Readonly<Record<string, string | number | boolean>>;
	/** Whether this proof came from direct page evidence rather than graph support. */
	direct: boolean;
};

/** Lookup table keyed by technology id for explanation rendering. */
export type ExplanationLookup = Readonly<Record<string, DetectionExplanationSummary>>;

/**
 * Convert replay explanations into a side panel lookup keyed by technology id.
 *
 * The side panel only renders explanation summaries for detections present in the
 * current response. Missing traces, snapshot hits, or stale trace data therefore
 * degrade to an empty lookup instead of creating misleading explanation copy.
 */
export function buildExplanationLookup(
	trace: DetectionReplayTrace | undefined,
): ExplanationLookup {
	if (!trace) {
		return {};
	}

	return dictionary.fromEntries(
		trace.explanations.map((explanation) => [
			explanation.technologyId,
			createExplanationSummary(explanation),
		]),
	);
}

/**
 * Create the compact explanation shape consumed by detection cards.
 *
 * Reasons and evidence previews are intentionally capped so explanation cards stay
 * scannable inside the extension side panel. Full replay traces remain available in
 * bounded history for users who need to inspect past runs.
 */
function createExplanationSummary(
	explanation: DetectionExplanation,
): DetectionExplanationSummary {
	return {
		technologyId: explanation.technologyId,
		headline: createExplanationHeadline(explanation),
		confidence: { ...explanation.confidence },
		reasons: explanation.reasons.slice(0, 3),
		evidenceCount: explanation.evidenceCount,
		primaryEvidenceKind: getPrimaryEvidenceKind(explanation),
		inferred: explanation.inferred,
		evidence: explanation.evidence.slice(0, 5).map(createEvidencePreview),
	};
}

/** Build the one-line reason shown before detailed explanation bullets. */
function createExplanationHeadline(explanation: DetectionExplanation): string {
	if (explanation.inferred) {
		return `Inferred from ${explanation.relationshipEvidenceCount} relationship signal${explanation.relationshipEvidenceCount === 1 ? '' : 's'}.`;
	}

	return `Matched ${explanation.directEvidenceCount} direct signal${explanation.directEvidenceCount === 1 ? '' : 's'}.`;
}

/** Safe preview of one evidence row, from a replay explanation or from stored detection evidence. */
export function createEvidencePreview(evidence: DetectionExplanationEvidenceSummary | Evidence): EvidencePreview {
	return {
		kind: evidence.kind,
		direct: evidence.direct !== false,
		...(evidence.matchedValue ? { matchedValue: evidence.matchedValue } : {}),
		...(evidence.version ? { version: evidence.version } : {}),
		...(evidence.sourceTechnologyId ? { sourceTechnologyId: evidence.sourceTechnologyId } : {}),
		...(evidence.observationKey ? { observationKey: evidence.observationKey } : {}),
		...(evidence.attributes ? { attributes: { ...evidence.attributes } } : {}),
	};
}

/** Pick the first public evidence kind because replay preserves detector order. */
function getPrimaryEvidenceKind(explanation: DetectionExplanation): string | null {
	return explanation.evidence[0]?.kind ?? null;
}
