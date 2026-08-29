import { browser } from 'wxt/browser';

import type { CollectionTierPlan } from './planning';
import { limitStringsByTotalChars, truncate, uniqueStrings } from '../detection/normalizers';
import { SOURCE_LIMITS } from '../detection/source-limits';
import { timeAsyncSpan, type TimingContext } from '../diagnostics/timing';
import type { NormalizedObservation, ObservationBatch } from '../observations';
import * as url from '@/utils/url';

/** Value shape stored for a page-owned JavaScript global. */
export type JsGlobalSignalValue = string | boolean | number;

/** Summary logger used by the background entrypoint without coupling collectors to console output. */
export type CollectorLog = (event: string, details?: Record<string, unknown>) => void;

/** Input needed to add privileged extension observations to a content batch. */
export type BackgroundObservationCollectorInput = {
	/** Visible tab id used when an injected script reads page-owned JavaScript globals. */
	readonly tabId: number;
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

const PASSIVE_FETCH_TIMEOUT_MS = 1_500;
const BACKGROUND_FETCH_CONCURRENCY = 4;

/**
 * Add observations the content script cannot collect on its own.
 *
 * The content script sees the DOM, storage keys, readable cookie names, and
 * resource timing entries. The background contributes facts that require
 * extension-only access: page-owned JavaScript globals, the analyzed document's
 * response headers, and bounded same-origin script or stylesheet text. Those
 * facts are appended as normal observations so the event pipeline has one input
 * shape regardless of which extension context collected each value.
 */
export async function collectBackgroundObservationBatch(
	input: BackgroundObservationCollectorInput,
): Promise<ObservationBatch> {
	input.signal?.throwIfAborted();
	const pageOrigin = url.getOrigin(input.batch.target.url);
	const timingContext: TimingContext = {
		traceId: input.timingTraceId,
		surface: 'collector',
		details: {
			tabId: input.tabId,
			hostname: input.batch.target.hostname,
			tier: input.collectionPlan.tier,
		},
	};
	const [jsGlobals, headers, fetchedSourceContents] = await Promise.all([
		timeAsyncSpan(
			'collector.background.js-globals',
			timingContext,
			() => collectInjectedJsGlobals(input.tabId, input.collectionPlan.jsGlobalPropertyList, input.log, input.signal),
			(values) => ({
				requestedGlobalCount: input.collectionPlan.jsGlobalPropertyList.length,
				matchedGlobalCount: Object.keys(values).length,
			}),
		),
		timeAsyncSpan(
			'collector.background.headers',
			timingContext,
			() => input.collectionPlan.needsHeaders ? collectResponseHeaders(input.batch.target.url, input.signal) : Promise.resolve<Record<string, string>>({}),
			(values) => ({ headerCount: Object.keys(values).length }),
		),
		timeAsyncSpan(
			'collector.background.same-origin-source-content',
			timingContext,
			() => collectSameOriginSourceContents(input.batch, pageOrigin, input.collectionPlan, input.signal),
			(values) => ({
				scriptContentCount: values.scriptContents.length,
				stylesheetContentCount: values.stylesheetContents.length,
			}),
		),
	]);
	input.signal?.throwIfAborted();
	const observations = [
		...input.batch.observations,
		...createJsGlobalObservations(input.batch, jsGlobals),
		...createHeaderObservations(input.batch, headers),
		...createTextObservations(input.batch, 'scriptContent', fetchedSourceContents.scriptContents),
		...createTextObservations(input.batch, 'stylesheetContent', fetchedSourceContents.stylesheetContents),
	];

	input.log?.('collect-background-observations-success', {
		tabId: input.tabId,
		hostname: input.batch.target.hostname,
		jsGlobalCount: Object.keys(jsGlobals).length,
		headerCount: Object.keys(headers).length,
		scriptContentCount: fetchedSourceContents.scriptContents.length,
		stylesheetContentCount: fetchedSourceContents.stylesheetContents.length,
		observationCount: observations.length,
	});

	return Object.assign({}, input.batch, { observations });
}

/**
 * Reads page-owned JavaScript globals with a short injected script.
 *
 * A content script runs in its own isolated JavaScript environment. That means
 * it can see the DOM but not values like `window.__NEXT_DATA__` exactly as the
 * page's own scripts see them. The background uses `browser.scripting` to run a
 * tiny function in the page and returns only bounded primitive summaries.
 */
export async function collectInjectedJsGlobals(
	tabId: number,
	propertyPaths: string[],
	log?: CollectorLog,
	signal?: AbortSignal,
): Promise<Record<string, JsGlobalSignalValue>> {
	signal?.throwIfAborted();
	if (!propertyPaths.length) {
		return {};
	}

	try {
		const results = await browser.scripting.executeScript({
			target: { tabId, frameIds: [0] },
			world: 'MAIN' as const,
			func: collectInjectedJsGlobalsFromPageContext,
			args: [propertyPaths, SOURCE_LIMITS.jsGlobalValueChars],
		});

		signal?.throwIfAborted();
		const firstResult = results[0]?.result;
		return isJsGlobalSignalRecord(firstResult) ? firstResult : {};
	} catch (error) {
		log?.('collect-js-globals-failed', {
			tabId,
			message: error instanceof Error ? error.message : 'Unknown JavaScript global collection failure',
		});
		return {};
	}
}

async function collectResponseHeaders(pageUrl: string, signal?: AbortSignal): Promise<Record<string, string>> {
	try {
		const response = await fetchWithTimeout(pageUrl, {
			cache: 'force-cache',
			credentials: 'omit',
			method: 'HEAD',
		}, PASSIVE_FETCH_TIMEOUT_MS, signal);

		return headersToSignalRecord(response.headers);
	} catch {
		return {};
	}
}

async function collectSameOriginSourceContents(
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

function createJsGlobalObservations(
	batch: ObservationBatch,
	values: Record<string, JsGlobalSignalValue>,
): NormalizedObservation[] {
	return Object.entries(values)
		.sort(([left], [right]) => left.localeCompare(right))
		.map(([key, value]) => createObservation(batch, {
			kind: 'jsGlobal',
			collector: 'page-main-world',
			key,
			value,
		}));
}

function createHeaderObservations(
	batch: ObservationBatch,
	values: Record<string, string>,
): NormalizedObservation[] {
	return Object.entries(values)
		.sort(([left], [right]) => left.localeCompare(right))
		.map(([key, value]) => createObservation(batch, {
			kind: 'header',
			collector: 'background-enrichment',
			key,
			value,
		}));
}

function createTextObservations(
	batch: ObservationBatch,
	kind: Extract<NormalizedObservation['kind'], 'scriptContent' | 'stylesheetContent'>,
	values: readonly string[],
): NormalizedObservation[] {
	return values.map((value) => createObservation(batch, {
		kind,
		collector: 'background-enrichment',
		value,
	}));
}

function createObservation(
	batch: ObservationBatch,
	input: Pick<NormalizedObservation, 'kind' | 'collector' | 'value'> & Partial<Pick<NormalizedObservation, 'key'>>,
): NormalizedObservation {
	return {
		kind: input.kind,
		interface: batch.interface,
		collector: input.collector,
		target: batch.target,
		observedAt: batch.observedAt,
		value: input.value,
		...(input.key !== undefined ? { key: input.key } : {}),
	};
}

function countObservations(batch: ObservationBatch, kind: NormalizedObservation['kind']): number {
	return batch.observations.filter((observation) => observation.kind === kind).length;
}

function totalObservationTextChars(batch: ObservationBatch, kind: NormalizedObservation['kind']): number {
	return batch.observations.reduce((total, observation) => {
		if (observation.kind !== kind || typeof observation.value !== 'string') {
			return total;
		}

		return total + observation.value.length;
	}, 0);
}

async function fetchBoundedTextSignals(
	urls: readonly string[],
	allowedOrigin: string,
	maxItems: number,
	maxChars: number,
	maxTotalChars: number,
	signal?: AbortSignal,
): Promise<string[]> {
	signal?.throwIfAborted();
	if (maxItems <= 0 || maxTotalChars <= 0) {
		return [];
	}

	const candidates = uniqueStrings(
		urls.filter((value) => isFetchableSameOriginUrl(value, allowedOrigin)),
	).slice(0, maxItems);

	const fetched: string[] = [];
	for (let index = 0; index < candidates.length; index += BACKGROUND_FETCH_CONCURRENCY) {
		signal?.throwIfAborted();
		const batch = candidates.slice(index, index + BACKGROUND_FETCH_CONCURRENCY);
		const values = await Promise.all(
			batch.map((value) => fetchBoundedText(value, maxChars, signal)),
		);

		for (const value of values) {
			if (!value) {
				continue;
			}
			fetched.push(value);
			if (fetched.length >= maxItems) {
				return limitStringsByTotalChars(fetched, maxItems, maxTotalChars);
			}
		}
	}

	return limitStringsByTotalChars(fetched, maxItems, maxTotalChars);
}

async function fetchBoundedText(value: string, maxChars: number, signal?: AbortSignal): Promise<string> {
	let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

	try {
		const response = await fetchWithTimeout(value, {
			cache: 'force-cache',
			credentials: 'omit',
		}, PASSIVE_FETCH_TIMEOUT_MS, signal);

		if (!response.ok || !response.body) {
			return '';
		}

		reader = response.body.getReader();
		const decoder = new globalThis.TextDecoder();
		let text = '';

		while (text.length < maxChars) {
			const { done, value } = await reader.read();
			if (done) break;

			text += decoder.decode(value, { stream: true });
			if (text.length >= maxChars) {
				await reader.cancel();
				break;
			}
		}

		return text.slice(0, maxChars);
	} catch {
		return '';
	} finally {
		if (reader) {
			try {
				await reader.cancel();
			} catch {
				// The stream may already be closed after a short bounded read.
			}

			try {
				reader.releaseLock();
			} catch {
				// Some runtimes release the lock as part of canceling the reader.
			}
		}
	}
}

async function fetchWithTimeout(
	value: string,
	init: RequestInit,
	timeoutMs: number,
	parentSignal?: AbortSignal,
): Promise<Response> {
	parentSignal?.throwIfAborted();
	const controller = new globalThis.AbortController();
	const abortFromParent = () => controller.abort(parentSignal?.reason);
	if (parentSignal) parentSignal.addEventListener('abort', abortFromParent, { once: true });
	const timeoutId = globalThis.setTimeout(() => controller.abort(new DOMException('Passive fetch timed out.', 'TimeoutError')), timeoutMs);
	try {
		return await globalThis.fetch(value, {
			...init,
			signal: controller.signal,
		});
	} finally {
		globalThis.clearTimeout(timeoutId);
		if (parentSignal) parentSignal.removeEventListener('abort', abortFromParent);
	}
}

function headersToSignalRecord(headers: Headers): Record<string, string> {
	const entries: Array<[string, string]> = [];
	for (const [key, value] of headers.entries()) {
		if (entries.length >= SOURCE_LIMITS.headers) {
			break;
		}

		entries.push([
			key.toLowerCase(),
			truncate(value, SOURCE_LIMITS.headerValueChars),
		]);
	}

	return Object.fromEntries(entries);
}

function isFetchableSameOriginUrl(value: string, allowedOrigin: string): boolean {
	try {
		const parsed = new globalThis.URL(value);
		return parsed.origin === allowedOrigin && (parsed.protocol === 'http:' || parsed.protocol === 'https:');
	} catch {
		return false;
	}
}

function isJsGlobalSignalRecord(value: unknown): value is Record<string, JsGlobalSignalValue> {
	if (!value || typeof value !== 'object' || Array.isArray(value)) {
		return false;
	}

	return Object.values(value).every((item) =>
		typeof item === 'string' || typeof item === 'boolean' || typeof item === 'number',
	);
}

function collectInjectedJsGlobalsFromPageContext(
	propertyPaths: string[],
	maxValueChars: number,
): Record<string, JsGlobalSignalValue> {
	const values: Record<string, JsGlobalSignalValue> = {};
	const root = globalThis as Record<string, unknown>;

	/** Get one injected page-global value without invoking unrelated global properties. */
	function getGlobalPath(propertyPath: string): unknown {
		if (Object.hasOwn(root, propertyPath)) {
			return root[propertyPath];
		}

		let current: unknown = root;
		for (const segment of propertyPath.split('.')) {
			if (current === undefined || current === null) {
				return undefined;
			}

			current = (current as Record<string, unknown>)[segment];
		}

		return current;
	}

	/** Convert an injected page-global value into the bounded signal representation. */
	function summarizeValue(value: unknown): JsGlobalSignalValue {
		const valueType = typeof value;
		if (valueType === 'string') {
			return (value as string).slice(0, maxValueChars);
		}
		if (valueType === 'number' || valueType === 'boolean') {
			return value as number | boolean;
		}
		if (valueType === 'function') {
			return 'function';
		}

		try {
			const constructorName = (value as { constructor?: { name?: string } }).constructor?.name;
			if (constructorName) {
				return constructorName.slice(0, maxValueChars);
			}
		} catch {
			// Fall through to String(value).
		}

		return String(value).slice(0, maxValueChars);
	}

	for (const propertyPath of propertyPaths) {
		try {
			const value = getGlobalPath(propertyPath);
			if (value === undefined || value === null) {
				continue;
			}

			values[propertyPath] = summarizeValue(value);
		} catch {
			// Some pages define getters with side effects or throwing accessors. Treat
			// those globals as unavailable rather than letting detection mutate the page.
		}
	}

	return values;
}
