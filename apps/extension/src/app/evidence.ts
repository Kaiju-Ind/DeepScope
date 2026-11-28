import type { EvidencePreview } from "./model/explanations.ts";

/** Format one already-redacted evidence row for human inspection. */
export function formatEvidencePreview(item: EvidencePreview): string {
	const value = formatEvidenceValue(item);
	const source = item.direct ? '' : ' inferred';
	const version = item.version ? ` version ${item.version}` : '';
	return value ? `${item.kind}${source}: ${value}${version}` : `${item.kind}${source}${version}`;
}

/** Prefer a relationship source or a meaningful key/value pair, avoiding redundant empty and boolean-true text. */
function formatEvidenceValue(item: EvidencePreview): string | undefined {
	if (item.kind === 'relationship') return item.matchedValue ?? item.sourceTechnologyId;
	const value = item.matchedValue;
	if (item.observationKey && (value === undefined || value === '' || value === 'true')) {
		return `${item.observationKey}${formatEvidenceAttributes(item)}`;
	}
	if (item.observationKey && value) return `${item.observationKey} = ${value}${formatEvidenceAttributes(item)}`;
	return value ?? item.sourceTechnologyId;
}

/** Append user-facing evidence attributes while omitting the internal rule-position field. */
function formatEvidenceAttributes(item: EvidencePreview): string {
	const entries = Object.entries(item.attributes ?? {}).filter(([key]) => key !== 'ruleIndex');
	return entries.length ? ` (${entries.map(([key, value]) => `${key}: ${String(value)}`).join(', ')})` : '';
}
