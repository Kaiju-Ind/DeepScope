import type { CollectionEvidencePass } from "@deepscope/detection/collection/plan";

import { RpcTimeoutError, withTimeout } from "../../messaging/rpc.ts";

import { errorResponse, type ExtensionResult } from "../../messaging/result.ts";

import type { BackgroundRuntimeDependencies, IncrementalEvidencePassRun } from './types.ts';
import { summarizeTab, createDetectionEvidenceState, getEvidencePassIds } from './output.ts';
import { mergeObservationBatches, isSameObservationTarget } from "@deepscope/detection/observations/merge";
import type { Type as RefreshBaseline } from './refresh/baseline.ts';
import type { Type as Tabs } from './tabs.ts';
import type { Type as Content } from './content.ts';
import type { Type as Sessions } from './sessions.ts';
import type { Type as JobsIndex } from './jobs/index.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
	readonly matcher: Pick<BackgroundRuntimeDependencies['matcher'], 'touchLifecycle' | 'releaseLifecycle'>;
	readonly getObservationRefreshBaseline: RefreshBaseline['getObservationRefreshBaseline'];
	readonly canSaveMatcher: Tabs['canSaveMatcher'];
	readonly collectObservationBatchFromTab: Content['collectObservationBatchFromTab'];
	readonly stopFailedFreshObservation: Sessions['stopFailedFreshObservation'];
	readonly retainObservationRefreshBaseline: RefreshBaseline['retainObservationRefreshBaseline'];
	readonly queueAnalysis: JobsIndex['queueAnalysis'];
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly runIncrementalEvidencePasses: (input: IncrementalEvidencePassRun) => Promise<void>;
}

/** Create one evidence owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const { getObservationRefreshBaseline, canSaveMatcher, collectObservationBatchFromTab, stopFailedFreshObservation, retainObservationRefreshBaseline, queueAnalysis } = dependencies;

	const logBackgroundEvent = dependencies.logEvent;

	/** Each follow-up evidence surface is bounded so one slow collector cannot own the UX. */
	const EVIDENCE_PASS_TIMEOUT_MS = 10_000;

	/**
	 * Run deeper evidence passes only after the first matcher revision has been queued.
	 *
	 * The old flow collected every enrichment surface before matching started, which
	 * made the side panel wait even when cheap observations were already available. The
	 * current flow waits until the initial matcher is registered, collects the
	 * follow-up surfaces, then queues one merged enrichment revision. That keeps
	 * first paint unblocked without running a full terminal pipeline for every
	 * expensive evidence surface.
	 */
	async function runIncrementalEvidencePasses(input: IncrementalEvidencePassRun): Promise<void> {
		const signal = input.workScope.controller.signal;
		let currentBatch = getObservationRefreshBaseline(input.tab.id, input.session) ?? input.baseBatch;
		const completedPassIds: CollectionEvidencePass['id'][] = [];

		try {
			for (const pass of input.passes) {
				signal.throwIfAborted();
				await dependencies.matcher.touchLifecycle(input.workScope.lifecycleId, input.tab.id);
				if (!await canSaveMatcher(input.tab, currentBatch.target.url)) {
					logBackgroundEvent('evidence-passes-stopped-after-navigation', {
						...summarizeTab(input.tab),
						passId: pass.id,
					});
					return;
				}

				const passBatch = await runEvidencePassWithTimeout((deadlineSignal) => collectObservationBatchFromTab(
					input.tab,
					input.compiledRegistryArtifact,
					pass.plan.tier,
					`${input.timingTraceId}:collect:${pass.id}`,
					pass.plan,
					deadlineSignal,
				), signal);
				signal.throwIfAborted();
				if (!passBatch.ok) {
					logBackgroundEvent('evidence-pass-collection-skipped', {
						...summarizeTab(input.tab),
						passId: pass.id,
						code: passBatch.failure.code,
						...(!input.tab.incognito && { message: passBatch.failure.message }),
					});
					continue;
				}
				if (!await canSaveMatcher(input.tab, passBatch.value.target.url)) {
					await stopFailedFreshObservation(input.tab, input.session, 'evidence-pass-document-changed');
					logBackgroundEvent('evidence-passes-stopped-after-navigation', {
						...summarizeTab(input.tab),
						passId: pass.id,
					});
					return;
				}

				const latestBatch = getObservationRefreshBaseline(input.tab.id, input.session);
				currentBatch = latestBatch && isSameObservationTarget(latestBatch, passBatch.value)
					? mergeObservationBatches(latestBatch, passBatch.value)
					: mergeObservationBatches(currentBatch, passBatch.value);
				retainObservationRefreshBaseline(input.tab, currentBatch, input.session);
				completedPassIds.push(pass.id);
			}

			if (completedPassIds.length === 0) return;

			const requiredPassIds = ['initial', ...getEvidencePassIds(input.passes)];
			const completedEvidencePassIds = ['initial', ...completedPassIds];
			const completedAllPasses = completedPassIds.length === input.passes.length;
			logBackgroundEvent('evidence-passes-collected', {
				...summarizeTab(input.tab),
				collectionPassIds: completedPassIds,
				observationCount: currentBatch.observations.length,
				timingTraceId: input.timingTraceId,
			});
			await input.waitForPreviousMatcherCompletion;
			signal.throwIfAborted();
			if (!await canSaveMatcher(input.tab, currentBatch.target.url)) {
				await stopFailedFreshObservation(input.tab, input.session, 'evidence-pass-document-changed-before-matcher');
				return;
			}
			logBackgroundEvent('evidence-pass-matcher-ready', {
				...summarizeTab(input.tab),
				collectionPassIds: completedPassIds,
				observationCount: currentBatch.observations.length,
				timingTraceId: input.timingTraceId,
			});

			const matcher = queueAnalysis({
				tab: input.tab,
				batch: currentBatch,
				compiledRegistryArtifact: input.compiledRegistryArtifact,
				snapshotStatus: input.snapshotStatus,
				session: input.session,
				details: {
					refreshKind: 'enrichment-pass',
					matcherMode: 'evidence-pass',
					collectionPassIds: completedPassIds,
					collectionPassCount: input.passes.length + 1,
				},
				enrichment: { status: 'complete', completedAt: Date.now() },
				evidence: createDetectionEvidenceState({
					level: completedAllPasses ? 'full' : 'enriched',
					completedPassIds: completedEvidencePassIds,
					requiredPassIds,
					complete: completedAllPasses,
					reason: completedAllPasses ? undefined : 'some-enrichment-passes-skipped',
				}),
				timingTraceId: input.timingTraceId,
				workScope: input.workScope,
			});
			await matcher.completion;
		} catch (error) {
			if (signal.aborted) {
				logBackgroundEvent('evidence-passes-canceled', {
					...summarizeTab(input.tab),
					completedPassIds,
				});
				return;
			}
			throw error;
		} finally {
			await dependencies.matcher.releaseLifecycle(input.workScope.lifecycleId);
		}
	}

	/** Bound one evidence pass, preserve caller cancellation and classify a live-script timeout as busy rather than a missing installation. */
	async function runEvidencePassWithTimeout<T>(
		operation: (signal: AbortSignal) => Promise<ExtensionResult<T>>,
		signal?: AbortSignal,
	): Promise<ExtensionResult<T>> {
		try {
			return await withTimeout(
				operation,
				EVIDENCE_PASS_TIMEOUT_MS,
				`The page was still busy with an earlier request; this evidence pass gave up after ${EVIDENCE_PASS_TIMEOUT_MS / 1000} s.`,
				{ signal },
			);
		} catch (error) {
			if (signal?.aborted) throw error;
			// The pass reached a live script (a missing one fails fast inside it), so a timeout means busy.
			if (error instanceof RpcTimeoutError) return errorResponse('CONTENT_SCRIPT_BUSY', error.message, error.stack);

			const message = error instanceof Error ? error.message : 'Evidence collection pass failed.';
			const stack = error instanceof Error ? error.stack : undefined;
			return errorResponse('UNKNOWN', message, stack);
		}
	}

	return { runIncrementalEvidencePasses };
}
