import * as offscreen from '../matcher/offscreen/index.ts';
import * as localWorkers from '../matcher/workers/local.ts';

import type * as matcherScheduler from '../scheduler/matcher/types.ts';

import type { BackgroundRuntimeDependencies } from './runtime/types.ts';

/** Runtime execution capabilities selected once when the background starts. */
export interface Type {
	readonly matcherExecutor: matcherScheduler.MatcherPartitionExecutor;
	readonly cancelForRecovery: (jobId: string) => Promise<void>;
}

/** Select workers in a background page or the offscreen host in a service worker. */
export function selectMatcherExecutor(logBackgroundEvent: BackgroundRuntimeDependencies['logEvent']): Type {
	// Firefox and Safari backgrounds are pages and run the matcher workers
	// themselves. Chrome's background is a service worker, which cannot create
	// workers, so it delegates to the offscreen document.
	const localMatcher = localWorkers.canRunWorkersLocally();
	if (!localMatcher) offscreen.start();
	const matcherExecutor: matcherScheduler.MatcherPartitionExecutor = localMatcher
		? localWorkers.createLocalExecutor()
		: {
			kind: 'offscreen-worker-pool',
			capacity: offscreen.capacity,
			runPartition: offscreen.runPartition,
			cancelJob: offscreen.cancel,
			cancelTab: offscreen.cancelTab,
			touchLifecycle: offscreen.touchLifecycle,
			releaseLifecycle: offscreen.releaseLifecycle,
		};
	const cancelForRecovery = localMatcher ? localWorkers.cancelForRecovery : offscreen.cancelForRecovery;
	logBackgroundEvent('matcher-executor-selected', { executor: localMatcher ? 'background-workers' : 'offscreen-document' });
	return { matcherExecutor, cancelForRecovery };
}
