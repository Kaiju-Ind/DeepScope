import { persistTransportedDiagnosticMessage } from "../../diagnostics/journal/write.ts";
import type { MatcherPartitionExecutor } from "../../scheduler/matcher/types.ts";
import { WorkerExecutor } from "./executor.ts";

/**
 * Return whether this context can run the matcher workers itself.
 *
 * Firefox and Safari run the extension background as a page, which can
 * construct a `Worker`. Chrome runs it as a service worker, which cannot, so
 * Chrome uses the offscreen document instead. Deciding by capability rather
 * than browser name keeps the choice correct if a browser changes its
 * background model.
 */
export function canRunWorkersLocally(): boolean {
	return typeof globalThis.Worker === 'function' && typeof globalThis.document !== 'undefined';
}

/**
 * Create a matcher executor that runs workers inside the current background page.
 *
 * Diagnostics from the workers go straight to the diagnostic journal, because a
 * page does not receive the runtime messages it sends itself. There is no
 * document to close when the executor goes idle; disposing the workers is the
 * whole cleanup.
 */
export function createLocalExecutor(): MatcherPartitionExecutor {
	const executor = new WorkerExecutor({
		/** Forward worker diagnostics to the local persistence owner without making matching wait for journal storage. */
		onDiagnostic: (message) => void persistTransportedDiagnosticMessage(message),
	});
	return {
		kind: 'background-workers',
		capacity: executor.capacity,
		/** Delegate one partition to the local executor; scheduling and admission remain with its caller. */
		runPartition: (request) => executor.run(request),
		/** Cancel this job's local worker work through the executor's cancellation owner. */
		cancelJob: async (jobId) => {
			executor.cancelJob(jobId);
		},
		/** Forward tab cancellation and its reason without changing the executor's resource-release policy. */
		cancelTab: async (tabId, reason) => {
			executor.cancelTab(tabId, reason);
		},
		/** Retain the named tab lifecycle in the local executor so idle shutdown does not remove active work. */
		touchLifecycle: async (lifecycleId, tabId) => {
			executor.touchLifecycle(lifecycleId, tabId);
		},
		/** Release the caller's lifecycle claim and let the executor decide whether it can become idle. */
		releaseLifecycle: async (lifecycleId) => {
			executor.releaseLifecycle(lifecycleId);
		},
	};
}

/**
 * Confirm that work from a previous background context has stopped.
 *
 * Local workers belong to the background page, so they ended when that page
 * unloaded. There is nothing left to cancel.
 */
export async function cancelForRecovery(_jobId: string): Promise<void> {}
