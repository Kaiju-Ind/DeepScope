import type { ContentApi } from "../messaging/index.ts";
import { CONTENT_SCRIPT_TIMEOUT_MS, injectionFailure, withTimeout } from "../messaging/rpc.ts";
import { errorResponse, ok, type ExtensionResult } from "../messaging/result.ts";

/** How long a ping waits for an already-running content script. */
export const PING_TIMEOUT_MS = 750;

/**
 * How long the single retry waits for a freshly injected script to register.
 * Under a burst of tab switches (seen on a private tab) a new script can take
 * longer than one ping to answer even though it loaded.
 */
export const INJECT_RETRY_PING_MS = 2_500;

export interface ContentInjectorDependencies {
	readonly executeContentScript: (tabId: number) => Promise<void>;
	readonly createContentApiClient: (tabId: number, frameId?: number) => ContentApi;
	readonly log: (event: string, details?: Record<string, unknown>) => void;
}

/** Make sure a tab's top frame runs the content runtime before an RPC is sent to it. */
export interface ContentInjector {
	/** Resolve true once the tab's content runtime answers within `timeoutMs`. */
	ping(tabId: number, signal?: AbortSignal, timeoutMs?: number): Promise<boolean>;
	/** Inject the runtime unless it already answers; concurrent callers share one injection. */
	ensure(tab: { readonly id: number; readonly incognito: boolean }, signal?: AbortSignal): Promise<ExtensionResult<void>>;
	/** Drop the tab's in-flight injection after navigation or closure. */
	forget(tabId: number): void;
}

/** Own per-tab injection promises and readiness retries while callers supply browser and messaging adapters. */
export function create(dependencies: ContentInjectorDependencies): ContentInjector {
	const { log } = dependencies;
	/**
	 * In-flight runtime injections are deduplicated per tab.
	 *
	 * Side panel refreshes and live-update requests can ask for the content runtime at nearly the same
	 * time. The first request owns the injection; later requests await the same
	 * promise instead of injecting duplicate runtime scripts into the page.
	 */
	const injectionByTab = new Map<number, Promise<ExtensionResult<void>>>();

	/** Probe existing top-frame content with a bounded timeout; transport failure or cancellation reports unavailable. */
	async function ping(tabId: number, signal?: AbortSignal, timeoutMs = PING_TIMEOUT_MS): Promise<boolean> {
		try {
			const contentApi = dependencies.createContentApiClient(tabId, 0);
			const response = await withTimeout(contentApi.getObservationSessionState(), timeoutMs, 'Content script ping timed out.', { signal });
			return response.ok;
		} catch {
			return false;
		}
	}

	/** Check document cancellation before and after script injection and normalize browser failures. */
	async function inject(tabId: number, signal?: AbortSignal): Promise<ExtensionResult<void>> {
		try {
			signal?.throwIfAborted();
			await dependencies.executeContentScript(tabId);
			signal?.throwIfAborted();
			return ok(undefined);
		} catch (error) {
			return injectionFailure(error);
		}
	}

	/** Inject once, then allow one longer readiness retry rather than creating a competing runtime. */
	async function injectAndWait(tab: { readonly id: number; readonly incognito: boolean }, signal?: AbortSignal): Promise<ExtensionResult<void>> {
		const tabId = tab.id;
		log('content-runtime-inject-start', { tabId });
		const injectionResponse = await inject(tabId, signal);
		if (!injectionResponse.ok) {
			log('content-runtime-inject-failed', {
				tabId,
				code: injectionResponse.failure.code,
				...(!tab.incognito && { message: injectionResponse.failure.message }),
			});
			return injectionResponse;
		}

		if (await ping(tabId, signal)) {
			log('content-runtime-inject-ready', { tabId });
			return ok(undefined);
		}
		// The script loaded but did not answer yet. Wait once more, longer, before
		// reporting it missing; injecting again could start a second runtime.
		log('content-runtime-inject-retry', { tabId });
		if (await ping(tabId, signal, INJECT_RETRY_PING_MS)) {
			log('content-runtime-inject-ready', { tabId, retried: true });
			return ok(undefined);
		}

		log('content-runtime-inject-timeout', { tabId });
		return errorResponse(
			'CONTENT_SCRIPT_UNAVAILABLE',
			'Injected content script did not register before the messaging timeout.',
		);
	}

	return {
		ping,
		/** Reuse a live runtime or the tab's in-flight injection, releasing the promise entry when its owning attempt settles. */
		async ensure(tab, signal) {
			const tabId = tab.id;
			signal?.throwIfAborted();
			if (await ping(tabId, signal)) {
				log('content-runtime-ready', { tabId });
				return ok(undefined);
			}

			const existingInjection = injectionByTab.get(tabId);
			if (existingInjection) {
				log('content-runtime-await-existing-injection', { tabId });
				return await withTimeout(existingInjection, CONTENT_SCRIPT_TIMEOUT_MS, 'Existing content-script injection did not settle.', { signal });
			}

			const injection = injectAndWait(tab, signal);
			injectionByTab.set(tabId, injection);
			try {
				return await injection;
			} finally {
				if (injectionByTab.get(tabId) === injection) injectionByTab.delete(tabId);
			}
		},
		/** Forget a retired tab's injection claim without pretending an already submitted browser injection can be canceled. */
		forget(tabId) {
			injectionByTab.delete(tabId);
		},
	};
}
