import type { Evidence } from '@/lib/detection/types';
import type { PanelEvidencePreview } from '@/lib/panel/view-model';

/** Convert stored detection evidence to the same safe preview shape used by replay explanations. */
export function createEvidencePreview(evidence: Evidence): PanelEvidencePreview {
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

/** Format one already-redacted evidence row for human inspection. */
export function formatEvidencePreview(item: PanelEvidencePreview): string {
	const value = formatEvidenceValue(item);
	const source = item.direct ? '' : ' inferred';
	const version = item.version ? ` version ${item.version}` : '';
	return value ? `${item.kind}${source}: ${value}${version}` : `${item.kind}${source}${version}`;
}

function formatEvidenceValue(item: PanelEvidencePreview): string | undefined {
	if (item.kind === 'relationship') return item.matchedValue ?? item.sourceTechnologyId;
	const value = item.matchedValue;
	if (item.observationKey && (value === undefined || value === '' || value === 'true')) {
		return `${item.observationKey}${formatEvidenceAttributes(item)}`;
	}
	if (item.observationKey && value) return `${item.observationKey} = ${value}${formatEvidenceAttributes(item)}`;
	return value ?? item.sourceTechnologyId;
}

function formatEvidenceAttributes(item: PanelEvidencePreview): string {
	const entries = Object.entries(item.attributes ?? {}).filter(([key]) => key !== 'ruleIndex');
	return entries.length ? ` (${entries.map(([key, value]) => `${key}: ${String(value)}`).join(', ')})` : '';
}
