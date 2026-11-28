import type { ObservationBatch } from "@deepscope/detection/observations";
import * as url from "../../../utils/url.ts";
import type { TimingContext } from "../../diagnostics/timing.ts";
import { timeAsyncSpan } from "../../diagnostics/timing.ts";
import type { BackgroundObservationCollectorInput } from "./types.ts";
import { collectInjectedJsGlobals } from "./globals.ts";
import { collectResponseHeaders } from "./fetch.ts";
import { collectSameOriginSourceContents } from "./sources.ts";
import { createJsGlobalObservations, createHeaderObservations, createTextObservations } from "./observations.ts";

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
		incognito: input.incognito,
		details: {
			tabId: input.tabId,
			...(!input.incognito && { hostname: input.batch.target.hostname }),
			tier: input.collectionPlan.tier,
		},
	};
	const [jsGlobals, headers, fetchedSourceContents] = await Promise.all([
		timeAsyncSpan(
			'collector.background.js-globals',
			timingContext,
			() => collectInjectedJsGlobals(input.tabId, input.collectionPlan.jsGlobalPropertyList, input.log, input.incognito, input.signal),
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
		...(!input.incognito && { hostname: input.batch.target.hostname }),
		jsGlobalCount: Object.keys(jsGlobals).length,
		headerCount: Object.keys(headers).length,
		scriptContentCount: fetchedSourceContents.scriptContents.length,
		stylesheetContentCount: fetchedSourceContents.stylesheetContents.length,
		observationCount: observations.length,
	});

	return Object.assign({}, input.batch, { observations });
}
