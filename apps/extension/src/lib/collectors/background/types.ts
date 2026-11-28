import type { ObservationBatch } from "@deepscope/detection/observations";
import type { CollectionTierPlan } from "@deepscope/detection/collection/plan";

/** Value shape stored for a page-owned JavaScript global. */
export type JsGlobalSignalValue = string | boolean | number;

/** Summary logger used by the background entrypoint without coupling collectors to console output. */
export type CollectorLog = (event: string, details?: Record<string, unknown>) => void;

/** Input needed to add privileged extension observations to a content batch. */
export type BackgroundObservationCollectorInput = {
	/** Visible tab id used when an injected script reads page-owned JavaScript globals. */
	readonly tabId: number;
	/** Privacy mode of the browser tab that owns the collection. */
	readonly incognito: boolean;
	/** Normalized facts returned by the content script for the analyzed document. */
	readonly batch: ObservationBatch;
	/** Rule-aware plan that tells the background which injected globals matter. */
	readonly collectionPlan: CollectionTierPlan;
	/** Optional logger supplied by the background entrypoint. */
	readonly log?: CollectorLog;
	/** Optional debug id used only to correlate summary timing logs. */
	readonly timingTraceId?: string;
	/** Document-work cancellation propagated from the background tab owner. */
	readonly signal?: AbortSignal;
};
