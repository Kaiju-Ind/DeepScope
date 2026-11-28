import type { ObservationBatch, NormalizedObservation } from "@deepscope/detection/observations";
import type { CollectionTierPlan } from "@deepscope/detection/collection/plan";
import { SOURCE_LIMITS } from "@deepscope/detection/limits";
import { fetchBoundedTextSignals } from "./fetch.ts";
import { uniqueStrings } from "@deepscope/detection/normalizers";

/** Collect only planned source kinds and subtract text already present before allocating same-origin fetch budgets. */
export async function collectSameOriginSourceContents(
	batch: ObservationBatch,
	pageOrigin: string,
	collectionPlan: CollectionTierPlan,
	signal?: AbortSignal,
): Promise<{ scriptContents: string[]; stylesheetContents: string[] }> {
	const scriptContentsAlreadyCollected = countObservations(batch, 'scriptContent');
	const stylesheetContentsAlreadyCollected = countObservations(batch, 'stylesheetContent');
	const [scriptContents, stylesheetContents] = await Promise.all([
		collectionPlan.needsScriptContent
			? fetchBoundedTextSignals(
				extractScriptUrls(batch),
				pageOrigin,
				SOURCE_LIMITS.scriptContentItems - scriptContentsAlreadyCollected,
				SOURCE_LIMITS.scriptContentChars,
				SOURCE_LIMITS.scriptContentTotalChars - totalObservationTextChars(batch, 'scriptContent'),
				signal,
			)
			: [],
		collectionPlan.needsStylesheetContent
			? fetchBoundedTextSignals(
				extractStylesheetUrls(batch),
				pageOrigin,
				SOURCE_LIMITS.stylesheetContentItems - stylesheetContentsAlreadyCollected,
				SOURCE_LIMITS.stylesheetContentChars,
				SOURCE_LIMITS.stylesheetContentTotalChars - totalObservationTextChars(batch, 'stylesheetContent'),
				signal,
			)
			: [],
	]);

	return { scriptContents, stylesheetContents };
}

/** Deduplicate script URLs from both explicit script observations and script-initiated resource entries. */
function extractScriptUrls(batch: ObservationBatch): string[] {
	return uniqueStrings(
		batch.observations.flatMap((observation) => {
			if (observation.kind === 'scriptSrc') {
				return [String(observation.value)];
			}
			if (observation.kind === 'resourceUrl' && observation.attributes?.initiatorType === 'script') {
				return [String(observation.value)];
			}

			return [];
		}),
	);
}

/** Deduplicate stylesheet URLs from link observations and CSS or link resource initiators. */
function extractStylesheetUrls(batch: ObservationBatch): string[] {
	return uniqueStrings(
		batch.observations.flatMap((observation) => {
			if (observation.kind === 'stylesheetHref') {
				return [String(observation.value)];
			}
			if (
				observation.kind === 'resourceUrl' &&
				(observation.attributes?.initiatorType === 'link' || observation.attributes?.initiatorType === 'css')
			) {
				return [String(observation.value)];
			}

			return [];
		}),
	);
}

/** Count existing observations of one kind so enrichment does not reuse their item budget. */
function countObservations(batch: ObservationBatch, kind: NormalizedObservation['kind']): number {
	return batch.observations.filter((observation) => observation.kind === kind).length;
}

/** Count existing string content of one kind against that source's total text budget. */
function totalObservationTextChars(batch: ObservationBatch, kind: NormalizedObservation['kind']): number {
	return batch.observations.reduce((total, observation) => {
		if (observation.kind !== kind || typeof observation.value !== 'string') {
			return total;
		}

		return total + observation.value.length;
	}, 0);
}
