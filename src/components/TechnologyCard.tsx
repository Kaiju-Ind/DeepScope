import { For, Show } from 'solid-js';

import type { Evidence, DetectionResult } from '@/lib/detection/types';
import type { PopupDetectionExplanationSummary, PopupEvidencePreview } from '@/lib/popup/view-model';

export function TechnologyCard(props: {
	/** Detection result rendered by this card. */
	result: DetectionResult;
	/** Whether this detection appeared after the popup opened. */
	isNew?: boolean;
	/** Whether this card represents a live pending observation state. */
	isPending?: boolean;
	/** Optional explanation summary derived from redacted replay data. */
	explanation?: PopupDetectionExplanationSummary;
}) {
	const evidencePreview = () => props.explanation?.evidence.length
		? props.explanation.evidence
		: props.result.evidence.slice(0, 5).map(createEvidencePreviewFromResult);
	const evidenceCount = () => props.explanation?.evidenceCount ?? props.result.evidence.length;

	return (
		<article
			class={`stat-card accent-slate technology-card${props.isNew ? ' is-new' : ''}${props.isPending ? ' is-pending' : ''}`}
		>
			<div class="technology-card-header">
				<span class="stat-label">{props.result.categories[0] ?? 'unknown'}</span>
				<Show when={props.isPending || props.isNew}>
					<span class={`detection-badge${props.isPending ? ' detection-badge-pending' : ''}`}>
						{props.isPending ? 'Live' : 'New'}
					</span>
				</Show>
			</div>
			<strong class="stat-value">{props.result.name}</strong>
			<Show when={props.result.description}>
				{(description) => <p>{description()}</p>}
			</Show>
			<Show when={props.result.version}>
				{(version) => <p>Version: {version()}</p>}
			</Show>
			<Show when={props.explanation}>
				{(explanation) => (
					<section
						class="explanation-summary"
						aria-label={`Why ${props.result.name} was detected`}
					>
						<p class="result-meta">
							{explanation().headline}
							{explanation().primaryEvidenceKind ? ` Primary signal: ${explanation().primaryEvidenceKind}.` : ''}
						</p>
						<ul class="evidence-list">
							<For each={explanation().reasons}>
								{(reason) => <li>{reason}</li>}
							</For>
						</ul>
					</section>
				)}
			</Show>
			<Show when={evidencePreview().length > 0}>
				<section class="evidence-preview" aria-label={`Evidence for ${props.result.name}`}>
					<p class="result-meta">Evidence: {evidenceCount()} signal(s)</p>
					<ul class="evidence-list evidence-detail-list">
						<For each={evidencePreview()}>
							{(item) => <li>{formatEvidencePreview(item)}</li>}
						</For>
					</ul>
				</section>
			</Show>
		</article>
	);
}

function createEvidencePreviewFromResult(evidence: Evidence): PopupEvidencePreview {
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

function formatEvidencePreview(item: PopupEvidencePreview): string {
	const value = formatEvidenceValue(item);
	const source = item.direct ? '' : ' inferred';
	const version = item.version ? ` version ${item.version}` : '';

	return value
		? `${item.kind}${source}: ${value}${version}`
		: `${item.kind}${source}${version}`;
}

function formatEvidenceValue(item: PopupEvidencePreview): string | undefined {
	if (item.kind === 'relationship') {
		return item.matchedValue ?? item.sourceTechnologyId;
	}

	const value = item.matchedValue;
	if (item.observationKey && (value === undefined || value === '' || value === 'true')) {
		return `${item.observationKey}${formatEvidenceAttributes(item)}`;
	}
	if (item.observationKey && value) {
		return `${item.observationKey} = ${value}${formatEvidenceAttributes(item)}`;
	}

	return value ?? item.sourceTechnologyId;
}

function formatEvidenceAttributes(item: PopupEvidencePreview): string {
	const entries = Object.entries(item.attributes ?? {}).filter(([key]) => key !== 'ruleIndex');
	if (entries.length === 0) {
		return '';
	}

	return ` (${entries.map(([key, value]) => `${key}: ${String(value)}`).join(', ')})`;
}

export default TechnologyCard;
