import type { CollectionTierPlan } from "@deepscope/detection/collection/plan";

import type * as observe from '../../content/observe/index.ts';

import { timeAsyncSpan, type TimingContext } from "../../diagnostics/timing.ts";
import type { ContentApi, FlushObservationBatchOutput, ObservationSessionTarget } from "../../messaging/index.ts";
import type { ObservationBatch } from "@deepscope/detection/observations";
import { CONTENT_SCRIPT_BUSY_LIMIT_MS, CONTENT_SCRIPT_TIMEOUT_MS, contentScriptFailure, withTimeout } from "../../messaging/rpc.ts";
import * as injection from '../injection.ts';

import { EXTENSION_OBSERVATION_POLICY } from "../../lifecycle/observation.ts";

import type { ExtensionResult } from "../../messaging/result.ts";

import type { BackgroundRuntimeDependencies, InspectableTab, CompiledRegistry } from './types.ts';
import { summarizeTab, summarizeSession, createContentPageSessionSnapshotTarget } from './output.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly executeContentScript: BackgroundRuntimeDependencies['executeContentScript'];
	readonly createContentApiClient: BackgroundRuntimeDependencies['createContentApiClient'];
	readonly collectObservationBatch: BackgroundRuntimeDependencies['collectObservationBatch'];
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly collectObservationBatchFromTab: (tab: InspectableTab, compiledRegistryArtifact: CompiledRegistry, tier?: 'initial' | 'enrichment', timingTraceId?: string, collectionTierPlan?: CollectionTierPlan, signal?: AbortSignal) => Promise<ExtensionResult<ObservationBatch>>;
	readonly getObservationSessionStateForTab: (tabId: number, signal?: AbortSignal) => Promise<ExtensionResult<observe.StateType>>;
	readonly flushObservationBatchForTab: (tabId: number, signal?: AbortSignal) => Promise<ExtensionResult<FlushObservationBatchOutput>>;
	readonly beginObservationSessionForTab: (tab: InspectableTab, compiledRegistryArtifact: CompiledRegistry, signal?: AbortSignal) => Promise<ExtensionResult<observe.StateType>>;
	readonly stopObservationSessionForTab: (tabId: number, target: Pick<ObservationSessionTarget, 'sessionId' | 'expectedUrl'>) => Promise<ExtensionResult<observe.StateType>>;
	readonly forgetContentScript: (tabId: number) => void;
}

/** Create one content owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const logBackgroundEvent = dependencies.logEvent;

	/** Content-runtime pings and per-tab deduplicated injection. */
	const injector = injection.create({ executeContentScript: dependencies.executeContentScript, createContentApiClient, log: logBackgroundEvent });

	const pingContentScript = injector.ping;

	const ensureContentScript = injector.ensure;

	/** Borrow a tab/frame-scoped messaging client; the default frame is the top-level document. */
	function createContentApiClient(tabId: number, frameId = 0): ContentApi {
		return dependencies.createContentApiClient(tabId, frameId);
	}

	/**
	 * Ask the extension collector for normalized observations from the visible tab.
	 *
	 * Fresh analysis no longer exposes the old page-snapshot detector path to the
	 * background. The content script collects document facts, background evidence passes
	 * appends privileged facts, and the event pipeline consumes the enriched batch.
	 */
	async function collectObservationBatchFromTab(
		tab: InspectableTab,
		compiledRegistryArtifact: CompiledRegistry,
		tier: 'initial' | 'enrichment' = 'initial',
		timingTraceId?: string,
		collectionTierPlan?: CollectionTierPlan,
		signal?: AbortSignal,
	): Promise<ExtensionResult<ObservationBatch>> {
		const timingContext: TimingContext = {
			traceId: timingTraceId,
			surface: 'background',
			incognito: tab.incognito,
			details: {
				...summarizeTab(tab),
				tier,
			},
		};
		const contentScriptResponse = await timeAsyncSpan(
			'background.content-runtime.ensure',
			timingContext,
			() => ensureContentScript(tab, signal),
			(response) => ({ ok: response.ok }),
		);
		if (!contentScriptResponse.ok) {
			return contentScriptResponse;
		}

		return timeAsyncSpan(
			'background.collect-extension-observation-batch',
			timingContext,
			() => dependencies.collectObservationBatch({
				tabId: tab.id,
				expectedUrl: tab.url,
				incognito: tab.incognito,
				collectionPlan: compiledRegistryArtifact.collectionPlan,
				tier,
				...(collectionTierPlan ? { collectionTierPlan } : {}),
				contentApi: createContentApiClient(tab.id, 0),
				// A busy content script (a large document walk, slow under Firefox's Xray
				// DOM wrappers) may only answer once its collection ends; a missing one
				// fails fast because the browser has no receiver for the message.
				isContentAlive: (probeSignal) => pingContentScript(tab.id, probeSignal, CONTENT_SCRIPT_BUSY_LIMIT_MS),
				log: logBackgroundEvent,
				timingTraceId,
				...(signal ? { signal } : {}),
			}),
			(response) => ({
				ok: response.ok,
				observationCount: response.ok ? response.value.observations.length : 0,
			}),
		);
	}

	/** Bound a content status request by the messaging timeout and optional document cancellation signal. */
	async function getObservationSessionStateForTab(
		tabId: number,
		signal?: AbortSignal,
	): Promise<ExtensionResult<observe.StateType>> {
		const contentApi = createContentApiClient(tabId, 0);

		try {
			return await withTimeout(
				contentApi.getObservationSessionState(),
				CONTENT_SCRIPT_TIMEOUT_MS,
				'Content script did not respond before the messaging timeout.',
				{ signal },
			);
		} catch (error) {
			return contentScriptFailure(error);
		}
	}

	/** Drain the content-owned queue through a timeout/cancellation-bounded RPC and normalize transport failures. */
	async function flushObservationBatchForTab(
		tabId: number,
		signal?: AbortSignal,
	): Promise<ExtensionResult<FlushObservationBatchOutput>> {
		const contentApi = createContentApiClient(tabId, 0);

		try {
			return await withTimeout(
				contentApi.flushObservationBatch(),
				CONTENT_SCRIPT_TIMEOUT_MS,
				'Content script did not respond before the messaging timeout.',
				{ signal },
			);
		} catch (error) {
			return contentScriptFailure(error);
		}
	}

	/** Ensure content is installed, allocate an exact session target and start observation with the registry's bounded collection requirements. */
	async function beginObservationSessionForTab(
		tab: InspectableTab,
		compiledRegistryArtifact: CompiledRegistry,
		signal?: AbortSignal,
	): Promise<ExtensionResult<observe.StateType>> {
		const sessionId = crypto.randomUUID();
		logBackgroundEvent('observation-start-requested', {
			...summarizeTab(tab),
			sessionId,
			policy: EXTENSION_OBSERVATION_POLICY,
		});

		const contentScriptResponse = await ensureContentScript(tab, signal);
		if (!contentScriptResponse.ok) {
			return contentScriptResponse;
		}

		const contentApi = createContentApiClient(tab.id, 0);

		try {
			const response = await withTimeout(
				contentApi.beginObservationSession({
					sessionId,
					expectedUrl: tab.url,
					snapshotTarget: createContentPageSessionSnapshotTarget(tab, sessionId),
					policy: EXTENSION_OBSERVATION_POLICY,
					includeScriptContent: compiledRegistryArtifact.collectionPlan.enrichment.needsScriptContent,
					includeStylesheetContent: compiledRegistryArtifact.collectionPlan.enrichment.needsStylesheetContent,
					domSelectorPlan: compiledRegistryArtifact.collectionPlan.initial.domSelectorPlan,
				}),
				CONTENT_SCRIPT_TIMEOUT_MS,
				'Content script did not respond before the messaging timeout.',
			);

			if (response.ok) {
				logBackgroundEvent('observation-started', {
					tabId: tab.id,
					...summarizeSession(response.value),
				});
			}

			return response;
		} catch (error) {
			return contentScriptFailure(error);
		}
	}

	/** Stop only the named session/document and normalize timeout or messaging failures into the existing result contract. */
	async function stopObservationSessionForTab(
		tabId: number,
		target: Pick<ObservationSessionTarget, 'sessionId' | 'expectedUrl'>,
	): Promise<ExtensionResult<observe.StateType>> {
		logBackgroundEvent('observation-stop-requested', { tabId, sessionId: target.sessionId });
		const contentApi = createContentApiClient(tabId, 0);

		try {
			const response = await withTimeout(
				contentApi.stopObservationSession(target),
				CONTENT_SCRIPT_TIMEOUT_MS,
				'Content script did not respond before the messaging timeout.',
			);

			if (response.ok) {
				logBackgroundEvent('observation-stopped', {
					tabId,
					...summarizeSession(response.value),
				});
			}

			return response;
		} catch (error) {
			return contentScriptFailure(error);
		}
	}

	/** Release per-tab injection coordination when its browser document is gone. */
	function forgetContentScript(tabId: number): void { injector.forget(tabId); }

	return { collectObservationBatchFromTab, getObservationSessionStateForTab, flushObservationBatchForTab, beginObservationSessionForTab, stopObservationSessionForTab, forgetContentScript };
}
