import { collectBackgroundObservationBatch, type CollectorLog } from './background-signals';
import {
	getCollectionTierPlan,
	toCollectPageSignalsInput,
	type CollectionPlan,
	type CollectionTier,
	type CollectionTierPlan,
} from './planning';
import type { CollectObservationBatchOutput, ContentApi } from '../messaging/analysis';
import type { ObservationBatch } from '../observations';
import {
	CONTENT_SCRIPT_BUSY_LIMIT_MS,
	CONTENT_SCRIPT_TIMEOUT_MS,
	contentScriptFailure,
	withLivenessDeadline,
	withTimeout,
} from '../messaging/rpc';
import { timeAsyncSpan, type TimingContext } from '../diagnostics/timing';
import { diagnosticErrorType } from '../privacy/redaction';
import { errorResponse, ok, type ExtensionResult } from '@/lib/messaging/result';
import * as url from '@/utils/url';

/** Input needed to collect one visible tab through extension APIs. */
export type ExtensionPageCollectorInput = {
	/** Visible tab id used for injected-script collection. */
	tabId: number;
	/** URL the background saw before contacting the content script. */
	expectedUrl: string;
	/** Privacy mode of the browser tab that owns the collection. */
	incognito: boolean;
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
	/** Document-work cancellation owned by the background tab lifecycle. */
	signal?: AbortSignal;
	/**
	 * Probe whether the content script still answers while a collection runs.
	 * When given, a slow but live content script keeps the request open up to
	 * `CONTENT_SCRIPT_BUSY_LIMIT_MS` instead of failing at the quiet timeout.
	 */
	isContentAlive?: (signal: AbortSignal) => Promise<boolean>;
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
): Promise<ExtensionResult<ObservationBatch>> {
	const tier = input.tier ?? input.collectionTierPlan?.tier ?? 'initial';
	const collectionPlan = input.collectionTierPlan ?? getCollectionTierPlan(input.collectionPlan, tier);
	const tabDetails = {
		tabId: input.tabId,
		...(input.incognito ? { incognito: true } : { hostname: new URL(input.expectedUrl).hostname }),
		tier,
	};
	const timingContext: TimingContext = {
		traceId: input.timingTraceId,
		surface: 'collector',
		incognito: input.incognito,
		details: tabDetails,
	};
	input.log?.('collect-observation-batch-start', tabDetails);

	input.log?.('collection-plan-selected', {
		tabId: input.tabId,
		tier,
		domSelectorCount: collectionPlan.domSelectorPlan.selectors.length,
		htmlProbeCount: collectionPlan.htmlProbeList.length,
		jsGlobalProbeCount: collectionPlan.jsGlobalPropertyList.length,
		needsHeaders: collectionPlan.needsHeaders,
		needsScriptContent: collectionPlan.needsScriptContent,
		needsStylesheetContent: collectionPlan.needsStylesheetContent,
		needsText: collectionPlan.needsText,
		needsStorage: collectionPlan.needsStorage,
	});

	try {
		input.signal?.throwIfAborted();
		const response = await timeAsyncSpan(
			'collector.content-rpc.collect-observation-batch',
			timingContext,
			() => {
				const request = input.contentApi.collectObservationBatch(toCollectPageSignalsInput(collectionPlan, tier, input.timingTraceId));
				const message = 'Content script did not respond before the messaging timeout.';
				if (!input.isContentAlive) return withTimeout(request, CONTENT_SCRIPT_TIMEOUT_MS, message, { signal: input.signal });
				return withLivenessDeadline(request, message, {
					timeoutMs: CONTENT_SCRIPT_TIMEOUT_MS,
					maxMs: CONTENT_SCRIPT_BUSY_LIMIT_MS,
					isAlive: input.isContentAlive,
					onExtended: (elapsedMs) => input.log?.('collect-observation-batch-busy', { tabId: input.tabId, tier, elapsedMs }),
					...(input.signal ? { signal: input.signal } : {}),
				});
			},
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
				...(!input.incognito && {
					expectedUrl: input.expectedUrl,
					actualUrl: response.value.batch.target.url,
				}),
			});
			return validationError;
		}

		input.signal?.throwIfAborted();
		const enrichedBatch = await timeAsyncSpan(
			'collector.background-enrichment.collect',
			timingContext,
			() => collectBackgroundObservationBatch({
				tabId: input.tabId,
				incognito: input.incognito,
				batch: response.value.batch,
				collectionPlan,
				log: input.log,
				timingTraceId: input.timingTraceId,
				...(input.signal ? { signal: input.signal } : {}),
			}),
			(batch) => ({ observationCount: batch.observations.length }),
		);

		input.log?.('collect-observation-batch-success', {
			tabId: input.tabId,
			tier,
			...(!input.incognito && { hostname: enrichedBatch.target.hostname }),
			observationCount: enrichedBatch.observations.length,
			observedAt: enrichedBatch.observedAt,
		});

		return ok(enrichedBatch);
	} catch (error) {
		input.log?.('collect-observation-batch-failed', {
			...tabDetails,
			...(input.incognito
				? { errorType: diagnosticErrorType(error) }
				: { message: error instanceof Error ? error.message : 'Unknown content collection failure' }),
		});
		return contentScriptFailure(error);
	}
}

/** Validate that a content-emitted batch still belongs to the active document. */
function validateObservationBatchTarget(
	output: CollectObservationBatchOutput,
	expectedUrl: string,
): ExtensionResult<never> | null {
	if (url.sameDocument(output.batch.target.url, expectedUrl)) {
		return null;
	}

	return errorResponse(
		'VALIDATION_ERROR',
		`Collected observations do not match the visible tab URL. Expected ${expectedUrl}, got ${output.batch.target.url}.`,
	);
}
