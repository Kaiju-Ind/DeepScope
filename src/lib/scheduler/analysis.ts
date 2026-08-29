import type {
	AnalyzeVisibleTabInput,
	AnalyzeVisibleTabOutput,
	VisibleTabIdentity,
} from '@/lib/messaging/analysis';
import { errorResponse, type ExtensionResult } from '@/lib/messaging/result';

import * as database from './database';
import * as fairness from './fairness';
import * as generation from '@/utils/generation';
import * as priority from './priority';
import * as session from './session';
import * as fence from '@/utils/fence';
import {
	AnalysisWorkSchema,
	EXECUTION_SCHEMA_VERSION,
	type AnalysisSourceType,
	type AnalysisWorkType,
	type WorkType,
} from './schema';

const MAX_PENDING_ANALYSES = 256;
const CLAIM_CLEANUP_ATTEMPTS = 3;

export interface AnalysisSchedulerOptions {
	/** Resolve the current browser document for one persisted hashed identity. */
	readonly resolveTarget: (work: AnalysisWorkType) => Promise<ExtensionResult<VisibleTabIdentity>>;
	/** Execute one analysis after the scheduler resolves its current exact document. */
	readonly analyze: (input: AnalyzeVisibleTabInput) => Promise<ExtensionResult<AnalyzeVisibleTabOutput>>;
	/** Optional structured diagnostic projection. */
	readonly log?: (event: string, details?: Record<string, unknown>) => void;
}

export interface AnalysisScheduler {
	/** Queue or join one analysis request. */
	analyze(input: AnalyzeVisibleTabInput, source?: AnalysisSourceType): Promise<ExtensionResult<AnalyzeVisibleTabOutput>>;
	/** Reprioritize non-interactive work after Chrome activates another tab in a window. */
	activateTab(tabId: number, windowId: number): Promise<void>;
	/** Cancel queued work for a closed tab. Active runtime work is canceled by the background owner. */
	cancelTab(tabId: number): Promise<void>;
	/** Recover queued/claimed analysis intent after service-worker replacement without executing it yet. */
	reconcile(): Promise<void>;
	/** Resume dispatch after sibling runtime recovery has released stale resources. */
	resume(): void;
}

type Completion = Promise<ExtensionResult<AnalyzeVisibleTabOutput>>;

type ClaimCleanupResult =
	| Readonly<{ kind: 'removed' }>
	| Readonly<{ kind: 'stale' }>
	| Readonly<{ kind: 'failed'; error: unknown }>;

/**
 * Remove one terminal analysis claim without replacing its primary result.
 *
 * Cleanup retries are bounded. A false result means another claim now owns the
 * deterministic work id and must never be touched by this execution. A storage
 * failure is reported separately so cleanup cannot erase a successful analysis
 * or the original analysis failure. Startup reconciliation remains the fallback
 * for a claim that survives all cleanup attempts.
 */
async function removeClaim(id: string, claimToken: string): Promise<ClaimCleanupResult> {
	let lastError: unknown;
	for (let attempt = 0; attempt < CLAIM_CLEANUP_ATTEMPTS; attempt += 1) {
		try {
			return await database.removeClaim(id, claimToken) ? { kind: 'removed' } : { kind: 'stale' };
		} catch (error) {
			lastError = error;
		}
	}
	return { kind: 'failed', error: lastError };
}

/**
 * Create a durable visible-document analysis scheduler.
 *
 * IndexedDB stores only safe execution intent. Raw DOM, HTML, text, script
 * source, and ObservationBatch values remain owned by the live runtime. One
 * in-memory completion Promise is shared by equivalent callers in the current
 * service-worker context, while the durable record lets a replacement context
 * safely rerun collection from the document instead of attempting to resume
 * dead browser handles.
 */
export function create(options: AnalysisSchedulerOptions): AnalysisScheduler {
	const owner = session.createId('analysis-scheduler');
	const completions = new Map<string, Completion>();
	const generations = generation.create<number>();
	const activeTabByWindow = new Map<number, number>();
	const tabCleanup = fence.create<number>();
	let foregroundDispatches = 0;
	let draining: Promise<void> | undefined;
	let paused = false;

	async function drain(): Promise<void> {
		if (paused) return;
		if (draining) return draining;
		const task = (async () => {
			const browserSessionId = await session.get();
			while (true) {
				const claimed = await claimNext(browserSessionId);
				if (!claimed || claimed.kind !== 'analysis') return;
				foregroundDispatches = claimed.priorityRank <= 1
					? Math.min(fairness.FOREGROUND_BURST_LIMIT, foregroundDispatches + 1)
					: 0;
				await execute(claimed);
			}
		})().finally(() => {
			if (draining === task) draining = undefined;
		});
		draining = task;
		return task;
	}

	/** Claim one analysis while giving queued background work a bounded progress turn. */
	async function claimNext(browserSessionId: string): Promise<WorkType | undefined> {
		if (foregroundDispatches >= fairness.FOREGROUND_BURST_LIMIT) {
			const lowerPriority = await database.claim({
				browserSessionId,
				kind: 'analysis',
				owner,
				minPriorityRank: 2,
				maxPriorityRank: 3,
			});
			if (lowerPriority) return lowerPriority;
		}

		return await database.claim({
			browserSessionId,
			kind: 'analysis',
			owner,
		});
	}

	async function execute(work: AnalysisWorkType): Promise<void> {
		const claimToken = work.claimToken;
		if (!claimToken) {
			options.log?.('scheduler-analysis-invalid-claim', { workId: work.id, tabId: work.tabId });
			return;
		}
		const executionGeneration = generations.capture(work.tabId);

		try {
			const target = await options.resolveTarget(work);
			const result = target.ok
				? await options.analyze({ target: target.value, mode: work.mode, observe: work.observe })
				: target;
			const cleanup = await removeClaim(work.id, claimToken);
			if (!canPublish(work, executionGeneration, cleanup, 'completion')) return;
			resolveCompletion(work.id, result);
			options.log?.('scheduler-analysis-complete', {
				workId: work.id,
				tabId: work.tabId,
				priority: work.priority,
				ok: result.ok,
			});
		} catch (error) {
			const result = errorResponse(
				'UNKNOWN',
				error instanceof Error ? error.message : 'Scheduled analysis failed.',
				error instanceof Error ? error.stack : undefined,
			);
			const cleanup = await removeClaim(work.id, claimToken);
			if (!canPublish(work, executionGeneration, cleanup, 'failure')) return;
			resolveCompletion(work.id, result);
			options.log?.('scheduler-analysis-failed', {
				workId: work.id,
				tabId: work.tabId,
				message: error instanceof Error ? error.message : String(error),
			});
		}
	}

	/** Decide whether one completed execution still owns its local result publication. */
	function canPublish(
		work: AnalysisWorkType,
		executionGeneration: number,
		cleanup: ClaimCleanupResult,
		phase: 'completion' | 'failure',
	): boolean {
		if (cleanup.kind === 'stale' || !generations.isCurrent(work.tabId, executionGeneration)) {
			options.log?.(`scheduler-analysis-stale-${phase}`, { workId: work.id, tabId: work.tabId });
			return false;
		}
		if (cleanup.kind === 'failed') {
			options.log?.('scheduler-analysis-cleanup-failed', {
				workId: work.id,
				tabId: work.tabId,
				message: cleanup.error instanceof Error ? cleanup.error.message : String(cleanup.error),
			});
		}
		return true;
	}

	function resolveCompletion(id: string, result: ExtensionResult<AnalyzeVisibleTabOutput>): void {
		const deferred = deferredById.get(id);
		if (!deferred) return;
		deferredById.delete(id);
		completions.delete(id);
		deferred.resolve(result);
	}

	const deferredById = new Map<string, {
		readonly resolve: (result: ExtensionResult<AnalyzeVisibleTabOutput>) => void;
	}>();

	function getCompletion(id: string): Completion {
		const existing = completions.get(id);
		if (existing) return existing;
		let resolve!: (result: ExtensionResult<AnalyzeVisibleTabOutput>) => void;
		const completion = new Promise<ExtensionResult<AnalyzeVisibleTabOutput>>((next) => {
			resolve = next;
		});
		deferredById.set(id, { resolve });
		completions.set(id, completion);
		return completion;
	}

	function canceled(message: string): ExtensionResult<AnalyzeVisibleTabOutput> {
		return errorResponse('VALIDATION_ERROR', message);
	}

	return {
		async analyze(input, source = 'interactive') {
			if (input.target.incognito) return await options.analyze(input);

			const tabGeneration = generations.capture(input.target.tabId);
			const browserSessionId = await session.get();
			await tabCleanup.wait(input.target.tabId);
			if (!generations.isCurrent(input.target.tabId, tabGeneration)) {
				return canceled('Analysis canceled before it entered the durable queue.');
			}
			const workId = getWorkId(browserSessionId, input);
			const now = Date.now();
			const activeTabId = activeTabByWindow.get(input.target.windowId);
			const workPriority = priority.analysis(source, activeTabId === undefined || activeTabId === input.target.tabId);
			const work = AnalysisWorkSchema.parse({
				schemaVersion: EXECUTION_SCHEMA_VERSION,
				id: workId,
				kind: 'analysis',
				browserSessionId,
				windowId: input.target.windowId,
				tabId: input.target.tabId,
				priority: workPriority,
				priorityRank: priority.rank(workPriority),
				state: 'queued',
				createdAt: now,
				updatedAt: now,
				attempt: 0,
				frameId: input.target.frameId,
				originHash: input.target.originHash,
				urlHash: input.target.urlHash,
				mode: input.mode,
				observe: input.observe,
				source,
			});
			if (!generations.isCurrent(input.target.tabId, tabGeneration)) {
				return canceled('Analysis canceled before it entered the durable queue.');
			}

			// Register the local completion before the durable record becomes claimable.
			// Another tab activation can start `drain()` immediately after the IDB
			// commit, so publishing the record first can otherwise lose completion.
			const completion = getCompletion(work.id);
			let admitted: database.AnalysisAdmissionType;
			try {
				admitted = await database.admitAnalysis(work, MAX_PENDING_ANALYSES);
			} catch (error) {
				const result = errorResponse(
					'UNKNOWN',
					error instanceof Error ? error.message : 'Failed to persist scheduled analysis.',
					error instanceof Error ? error.stack : undefined,
				);
				resolveCompletion(work.id, result);
				return await completion;
			}
			if (!admitted.accepted) {
				resolveCompletion(work.id, errorResponse('VALIDATION_ERROR', 'DeepScope analysis queue reached its bounded work limit.'));
				return await completion;
			}
			if (!generations.isCurrent(input.target.tabId, tabGeneration)) {
				await database.remove(work.id).catch(() => undefined);
				resolveCompletion(work.id, canceled('Analysis canceled while it entered the durable queue.'));
				return await completion;
			}

			// Activation can race the admission transaction. Reconcile against the
			// admitted priority so an automatic caller can never downgrade existing
			// interactive work while correcting stale foreground/background state.
			const currentActiveTabId = activeTabByWindow.get(input.target.windowId);
			const currentPriority = priority.tab(
				admitted.work.priority,
				currentActiveTabId === undefined || currentActiveTabId === input.target.tabId,
			);
			if (currentPriority !== admitted.work.priority) await database.setPriority(work.id, currentPriority);
			void drain();
			return await completion;
		},

		async activateTab(tabId, windowId) {
			activeTabByWindow.set(windowId, tabId);
			const browserSessionId = await session.get();
			const changed = await database.reprioritizeWindow(browserSessionId, windowId, tabId);
			options.log?.('scheduler-window-reprioritized', { tabId, windowId, changed });
			void drain();
		},

		async cancelTab(tabId) {
			for (const [windowId, activeTabId] of activeTabByWindow) {
				if (activeTabId === tabId) activeTabByWindow.delete(windowId);
			}
			generations.invalidate(tabId);
			await tabCleanup.run(tabId, async () => {
				const browserSessionId = await session.get();
				const removed = await database.removeTabKind(browserSessionId, tabId, 'analysis');
				for (const work of removed) {
					if (work.kind !== 'analysis') continue;
					resolveCompletion(work.id, errorResponse('VALIDATION_ERROR', 'Analysis canceled because its tab closed.'));
				}
			});
		},


		async reconcile() {
			paused = true;
			const browserSessionId = await session.get();
			await database.removeOtherSessions(browserSessionId);
			const recovered = await database.recoverClaims(browserSessionId, owner, 'analysis');
			options.log?.('scheduler-analysis-reconciled', {
				recovered: recovered.filter((work) => work.kind === 'analysis').length,
			});
		},

		resume() {
			paused = false;
			void drain();
		},
	};
}

function getWorkId(browserSessionId: string, input: AnalyzeVisibleTabInput): string {
	return [
		'analysis',
		browserSessionId,
		input.target.tabId,
		input.target.urlHash,
		input.mode,
		input.observe,
	].join(':');
}
