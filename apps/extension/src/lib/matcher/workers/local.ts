import { persistTransportedDiagnosticMessage } from '../../diagnostics/journal';
import type { MatcherPartitionExecutor } from '../../scheduler/matcher';
import { WorkerExecutor } from './executor';

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
		onDiagnostic: (message) => void persistTransportedDiagnosticMessage(message),
	});
	return {
		capacity: executor.capacity,
		runPartition: (request) => executor.run(request),
		cancelJob: async (jobId) => {
			executor.cancelJob(jobId);
		},
		cancelTab: async (tabId, reason) => {
			executor.cancelTab(tabId, reason);
		},
		touchLifecycle: async (lifecycleId, tabId) => {
			executor.touchLifecycle(lifecycleId, tabId);
		},
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
