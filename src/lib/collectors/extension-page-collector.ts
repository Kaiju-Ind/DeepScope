import { collectBackgroundObservationBatch, type CollectorLog } from './background-signals';
import {
	getCollectionTierPlan,
	toCollectPageSignalsInput,
	type CollectionPlan,
	type CollectionTier,
	type CollectionTierPlan,
} from './planning';
import type { CollectObservationBatchOutput, ContentApi } from '../contracts/analysis';
import type { ObservationBatch } from '../observations';
import {
	CONTENT_SCRIPT_TIMEOUT_MS,
	contentScriptFailure,
	withTimeout,
} from '../messaging/rpc';
import { ensureKaijuSiteScopeOffscreenDocument } from '../lifecycle/offscreen-matcher';
import { timeAsyncSpan, type TimingContext } from '../diagnostics/timing';
import { errorResponse, ok, type AppResult } from '../shared/result';
import { isSameDocumentUrl } from '../shared/url';

/** Input needed to collect one visible tab through extension APIs. */
export type ExtensionPageCollectorInput = {
	/** Visible tab id used for injected-script collection. */
	tabId: number;
	/** URL the background saw before contacting the content script. */
	expectedUrl: string;
	/** Precompiled collection plan from the active registry artifact. */
	collectionPlan: CollectionPlan;
	/** Which plan tier should be collected for this request. */
	tier?: CollectionTier;
	/** Exact evidence pass plan selected by the background scheduler. */
	collectionTierPlan?: CollectionTierPlan;
	/** RPC client for the content script running in the visible tab. */
	contentApi: ContentApi;
	/** Optional summary logger supplied by the background entrypoint. */
	log?: CollectorLog;
	/** Optional debug id used only to correlate summary timing logs. */
	timingTraceId?: string;
};

/**
 * Collect the visible tab as normalized observations for the event pipeline.
 *
 * The scheduler sends small evidence pass plans instead of one bootstrap pass
 * followed by one large enrichment pass. Each returned batch can be merged into
 * the current evidence store and published as a normal snapshot revision.
 */
export async function collectExtensionObservationBatch(
	input: ExtensionPageCollectorInput,
): Promise<AppResult<ObservationBatch>> {
	const tier = input.tier ?? input.collectionTierPlan?.tier ?? 'initial';
	const collectionPlan = input.collectionTierPlan ?? getCollectionTierPlan(input.collectionPlan, tier);
	const timingContext: TimingContext = {
		traceId: input.timingTraceId,
		surface: 'collector',
		details: {
			tabId: input.tabId,
			hostname: new URL(input.expectedUrl).hostname,
			tier,
		},
	};
	input.log?.('collect-observation-batch-start', {
		tabId: input.tabId,
		hostname: new URL(input.expectedUrl).hostname,
		tier,
	});

	input.log?.('collection-plan-selected', {
		tabId: input.tabId,
		tier,
		selectorProbeCount: collectionPlan.selectorProbeList.length,
		htmlProbeCount: collectionPlan.htmlProbeList.length,
		jsGlobalProbeCount: collectionPlan.jsGlobalPropertyList.length,
		needsHeaders: collectionPlan.needsHeaders,
		needsScriptContent: collectionPlan.needsScriptContent,
		needsStylesheetContent: collectionPlan.needsStylesheetContent,
		needsText: collectionPlan.needsText,
		needsStorage: collectionPlan.needsStorage,
	});

	try {
		await ensureKaijuSiteScopeOffscreenDocument();
		const response = await timeAsyncSpan(
			'collector.content-rpc.collect-observation-batch',
			timingContext,
			() => withTimeout(
				input.contentApi.collectObservationBatch(toCollectPageSignalsInput(collectionPlan, tier, input.timingTraceId)),
				CONTENT_SCRIPT_TIMEOUT_MS,
				'Content script did not respond before the messaging timeout.',
			),
			(result) => ({
				ok: result.ok,
				observationCount: result.ok ? result.value.batch.observations.length : 0,
			}),
		);

		if (!response.ok) {
			return response;
		}

		const validationError = validateObservationBatchTarget(response.value, input.expectedUrl);
		if (validationError) {
			input.log?.('collect-observation-batch-mismatch', {
				tabId: input.tabId,
				expectedUrl: input.expectedUrl,
				actualUrl: response.value.batch.target.url,
			});
			return validationError;
		}

		const enrichedBatch = await timeAsyncSpan(
			'collector.background-enrichment.collect',
			timingContext,
			() => collectBackgroundObservationBatch({
				tabId: input.tabId,
				batch: response.value.batch,
				collectionPlan,
				log: input.log,
				timingTraceId: input.timingTraceId,
			}),
			(batch) => ({ observationCount: batch.observations.length }),
		);

		input.log?.('collect-observation-batch-success', {
			tabId: input.tabId,
			tier,
			hostname: enrichedBatch.target.hostname,
			observationCount: enrichedBatch.observations.length,
			observedAt: enrichedBatch.observedAt,
		});

		return ok(enrichedBatch);
	} catch (error) {
		input.log?.('collect-observation-batch-failed', {
			tabId: input.tabId,
			tier,
			hostname: new URL(input.expectedUrl).hostname,
			message: error instanceof Error ? error.message : 'Unknown content collection failure',
		});
		return contentScriptFailure(error);
	}
}

/** Validate that a content-emitted batch still belongs to the active document. */
function validateObservationBatchTarget(
	output: CollectObservationBatchOutput,
	expectedUrl: string,
): AppResult<never> | null {
	if (isSameDocumentUrl(output.batch.target.url, expectedUrl)) {
		return null;
	}

	return errorResponse(
		'VALIDATION_ERROR',
		`Collected observations do not match the visible tab URL. Expected ${expectedUrl}, got ${output.batch.target.url}.`,
	);
}
