import { describe, expect, it } from 'vitest';

import {
	buildPanelAnalysisUpdate,
	buildPanelExplanationLookup,
	createPanelVisibleRevisionFromAnalysisResponse,
	formatPanelAppError,
	getPanelReplayState,
	getPanelAnalysisActivity,
	getPanelMatcherStatusFromSnapshot,
	getPanelObservationLabel,
	getPanelObservationModeFromAnalysis,
	getPanelObservationModeFromSession,
	getPanelObservationModeFromSnapshot,
	groupDetectionsByPrimaryCategory,
	isPanelVisibleRevisionPending,
	shouldApplyPanelReplayState,
	shouldApplyPanelSnapshotRevision,
	shouldKeepPanelLiveUpdatesActive,
	shouldPreservePanelReplayState,
} from '@/lib/panel/view-model';
import {
	makeAnalysis,
	makeAnalyzeVisibleTabOutput,
	makeDetection,
	makeDetectionReplayTrace,
	makeDetectionSessionSnapshot,
	makeObservationSession,
} from '../support/factories';

describe('side panel view model', () => {
	it('groups detections by their first category and keeps category priority order', () => {
		const groups = groupDetectionsByPrimaryCategory([
			makeDetection('ga', ['analytics']),
			makeDetection('react', ['framework']),
			makeDetection('unknown-tech', []),
		]);

		expect(groups.map((group) => group.category)).toEqual([
			'framework',
			'analytics',
			'unknown',
		]);
		expect(groups[0]).toMatchObject({ label: 'Framework', results: [{ technologyId: 'react' }] });
	});

	it('maps snapshot hits without an active session to idle state', () => {
		const response = makeAnalyzeVisibleTabOutput({
			snapshot: {
				status: 'hit',
				key: 'analysis:https://example.com',
			},
		});

		expect(getPanelObservationModeFromAnalysis(response)).toBe('idle');
		expect(shouldKeepPanelLiveUpdatesActive('idle')).toBe(false);
		expect(getPanelObservationLabel('idle')).toBe('Idle');
	});

	it('maps observing and dirty sessions to active side panel live updates', () => {
		expect(getPanelObservationModeFromSession(makeObservationSession('observing'))).toBe('active');
		expect(getPanelObservationModeFromSession(makeObservationSession('dirty'))).toBe('active');
		expect(shouldKeepPanelLiveUpdatesActive('active')).toBe(true);
		expect(getPanelObservationLabel('active')).toBe('Observing');
	});

	it('maps stopped sessions to stopped side panel controls', () => {
		expect(getPanelObservationModeFromSession(makeObservationSession('stopped'))).toBe('stopped');
		expect(shouldKeepPanelLiveUpdatesActive('stopped')).toBe(false);
		expect(getPanelObservationLabel('stopped')).toBe('Stopped');
	});

	it('describes queued visible-tab work ahead of stale matcher work', () => {
		const activity = getPanelAnalysisActivity({
			matcherStatus: 'matching',
			workflowBusy: false,
			analysisRequestInFlight: false,
			queuedVisibleAnalysis: true,
		});

		expect(activity).toMatchObject({
			busy: true,
			label: 'queued for this tab',
			headline: 'Waiting to scan this tab',
		});
	});

	it('keeps the side panel in a loading state while the current tab request has no matcher revision yet', () => {
		const activity = getPanelAnalysisActivity({
			matcherStatus: 'idle',
			workflowBusy: false,
			analysisRequestInFlight: true,
			queuedVisibleAnalysis: false,
		});

		expect(activity).toMatchObject({
			busy: true,
			label: 'loading current tab',
			headline: 'Loading latest detections',
		});
	});

	it('describes matcher partition progress when snapshot revisions include counters', () => {
		const activity = getPanelAnalysisActivity({
			matcherStatus: 'matching',
			workflowBusy: false,
			analysisRequestInFlight: false,
			queuedVisibleAnalysis: false,
			matcherProgress: {
				completedPartitionCount: 7,
				partitionCount: 12,
				latestPartitionKind: 'scriptContent',
				resultCount: 34,
			},
		});

		expect(activity).toMatchObject({
			busy: true,
			label: 'matching evidence 7/12',
			description: expect.stringContaining('Matched 7 of 12 evidence batches.'),
		});
	});

	it('reports complete when no visible tab workflow owns progress', () => {
		const activity = getPanelAnalysisActivity({
			matcherStatus: 'idle',
			workflowBusy: false,
			analysisRequestInFlight: false,
			queuedVisibleAnalysis: false,
		});

		expect(activity).toMatchObject({
			busy: false,
			label: 'complete',
		});
	});

	it('keeps partial background snapshots in the matching lane until replay summary arrives', () => {
		const partialSnapshot = makeDetectionSessionSnapshot({
			source: 'background',
			status: 'complete',
			analysis: makeAnalysis([makeDetection('react')]),
			detectionCount: 1,
		});
		const finalSnapshot = makeDetectionSessionSnapshot({
			source: 'background',
			status: 'complete',
			analysis: makeAnalysis([makeDetection('react')]),
			detectionCount: 1,
			replaySummary: {
				analyzedAt: 1_700_000_000_000,
				eventCount: 5,
				explanationCount: 1,
				resultCount: 1,
				stages: ['detections-emitted'],
			},
		});

		expect(getPanelMatcherStatusFromSnapshot(partialSnapshot)).toBe('matching');
		expect(getPanelMatcherStatusFromSnapshot(finalSnapshot)).toBe('idle');
	});

	it('keeps replay-backed snapshots in matching state when newer matcher progress exists', () => {
		const snapshot = makeDetectionSessionSnapshot({
			source: 'background',
			status: 'complete',
			analysis: makeAnalysis([makeDetection('react'), makeDetection('nextjs')]),
			detectionCount: 2,
			replaySummary: {
				analyzedAt: 1_700_000_000_000,
				eventCount: 5,
				explanationCount: 2,
				resultCount: 2,
				stages: ['detections-emitted'],
			},
			matcherProgress: {
				jobId: 'job-late',
				mode: 'enrichment',
				completedPartitionCount: 2,
				partitionCount: 8,
				resultCount: 3,
				updatedAt: 1_700_000_000_500,
			},
		});

		expect(getPanelMatcherStatusFromSnapshot(snapshot)).toBe('matching');
	});

	it('treats stored partial snapshot revisions as pending and blocks stale replay state', () => {
		const pendingRevision = createPanelVisibleRevisionFromAnalysisResponse(makeAnalyzeVisibleTabOutput({
			analysis: makeAnalysis([makeDetection('react')]),
			enrichment: { status: 'pending' },
			replayHistory: [makeDetectionReplayTrace({ resultCount: 1 })],
		}));
		const storedPartialRevision = {
			...pendingRevision,
			source: 'snapshot' as const,
			enrichment: { status: 'not-needed' as const },
			sessionSnapshotStatus: 'complete' as const,
			sessionSnapshotSource: 'background' as const,
		};
		const storedCacheRevision = {
			...storedPartialRevision,
			sessionSnapshotSource: 'cache' as const,
		};
		const finalRevision = createPanelVisibleRevisionFromAnalysisResponse(makeAnalyzeVisibleTabOutput({
			analysis: makeAnalysis([makeDetection('react')]),
			replayTrace: makeDetectionReplayTrace({ resultCount: 1 }),
		}));

		expect(isPanelVisibleRevisionPending(pendingRevision)).toBe(true);
		expect(shouldApplyPanelReplayState(pendingRevision)).toBe(false);
		expect(isPanelVisibleRevisionPending(storedPartialRevision)).toBe(true);
		expect(shouldApplyPanelReplayState(storedPartialRevision)).toBe(false);
		expect(isPanelVisibleRevisionPending(storedCacheRevision)).toBe(false);
		expect(isPanelVisibleRevisionPending(finalRevision)).toBe(false);
		expect(shouldApplyPanelReplayState(finalRevision)).toBe(true);
	});

	it('builds a manual refresh notice while preserving active observation state', () => {
		const response = makeAnalyzeVisibleTabOutput({
			analysis: makeAnalysis([makeDetection('react')]),
			session: makeObservationSession('observing'),
		});

		const update = buildPanelAnalysisUpdate({
			previousAnalysis: null,
			revision: createPanelVisibleRevisionFromAnalysisResponse(response),
			source: 'manual',
			resetLateMarkers: true,
		});

		expect(update).toMatchObject({
			observationMode: 'active',
			shouldKeepLiveUpdatesActive: true,
			lateDetectionIds: [],
			notice: {
				variant: 'success',
				text: 'Refreshed 1 technologies for example.com. Observation is active again.',
			},
		});
	});


	it('keeps continuous snapshot revisions tied to the active observer', () => {
		const response = makeAnalyzeVisibleTabOutput({
			analysis: makeAnalysis([makeDetection('nextjs')]),
			session: makeObservationSession('observing'),
		});

		const update = buildPanelAnalysisUpdate({
			previousAnalysis: null,
			revision: createPanelVisibleRevisionFromAnalysisResponse(response),
			source: 'initial',
		});

		expect(update).toMatchObject({
			observationMode: 'active',
			shouldKeepLiveUpdatesActive: true,
			notice: null,
		});
	});


	it('marks newly added automatic observation detections without duplicating previous late ids', () => {
		const previousAnalysis = makeAnalysis([makeDetection('react')]);
		const response = makeAnalyzeVisibleTabOutput({
			analysis: makeAnalysis([makeDetection('react'), makeDetection('shopify', ['platform-cms-builder'])]),
			session: makeObservationSession('dirty'),
		});

		const update = buildPanelAnalysisUpdate({
			previousAnalysis,
			revision: createPanelVisibleRevisionFromAnalysisResponse(response),
			source: 'auto',
			currentLateDetectionIds: ['shopify'],
		});

		expect(update.addedDetectionIds).toEqual(['shopify']);
		expect(update.lateDetectionIds).toEqual(['shopify']);
		expect(update.notice?.text).toBe('Analysis update found 1 additional detection on example.com.');
	});


	it('ignores empty content lifecycle snapshots when detector output is already visible', () => {
		const currentAnalysis = makeAnalysis([makeDetection('react')]);
		const snapshot = makeDetectionSessionSnapshot({
			source: 'content',
			status: 'observing',
			analysis: makeAnalysis([], { url: currentAnalysis.url, analyzedAt: currentAnalysis.analyzedAt }),
		});

		expect(shouldApplyPanelSnapshotRevision({ currentAnalysis, snapshot })).toBe(false);
	});

	/**
	 * Worker partitions can finish out of order across an initial run and a dirty
	 * refresh. A lower-count partial should not replace richer visible results; the
	 * replay-backed final snapshot remains the authoritative place to remove a
	 * candidate when graph refinement proves it should not survive.
	 */
	it('ignores lower-count partial background snapshots for the same page', () => {
		const currentAnalysis = makeAnalysis([
			makeDetection('react'),
			makeDetection('nextjs'),
		]);
		const partialSnapshot = makeDetectionSessionSnapshot({
			source: 'background',
			analysis: makeAnalysis([makeDetection('react')], { url: currentAnalysis.url }),
			detectionCount: 1,
		});
		const finalSnapshot = makeDetectionSessionSnapshot({
			source: 'background',
			analysis: makeAnalysis([makeDetection('react')], { url: currentAnalysis.url }),
			detectionCount: 1,
			replaySummary: {
				analyzedAt: currentAnalysis.analyzedAt,
				eventCount: 1,
				explanationCount: 1,
				resultCount: 1,
				stages: ['detections-emitted'],
			},
		});

		expect(shouldApplyPanelSnapshotRevision({ currentAnalysis, snapshot: partialSnapshot })).toBe(false);
		expect(shouldApplyPanelSnapshotRevision({ currentAnalysis, snapshot: finalSnapshot })).toBe(true);
	});


	it('ignores lower-count recovered snapshots even when the recovered run has replay output', () => {
		const currentAnalysis = makeAnalysis([
			makeDetection('react'),
			makeDetection('nextjs'),
			makeDetection('vercel'),
		]);
		const recoveredSnapshot = makeDetectionSessionSnapshot({
			source: 'background',
			analysis: makeAnalysis([makeDetection('react')], { url: currentAnalysis.url }),
			detectionCount: 1,
			evidence: {
				level: 'recovered-initial',
				completedPassIds: ['initial'],
				requiredPassIds: ['initial', 'html', 'headers'],
				complete: false,
				updatedAt: currentAnalysis.analyzedAt,
				reason: 'service-worker-recovered-refresh',
			},
			replaySummary: {
				runId: 'recovered-run',
				analyzedAt: currentAnalysis.analyzedAt,
				eventCount: 1,
				explanationCount: 1,
				resultCount: 1,
				stages: ['detections-emitted'],
			},
		});

		expect(shouldApplyPanelSnapshotRevision({ currentAnalysis, snapshot: recoveredSnapshot })).toBe(false);
	});

	it('filters replay history to entries that explain the visible analysis', () => {
		const analysis = makeAnalysis([makeDetection('react')], { analyzedAt: 2_000 });
		const mismatchedTrace = makeDetectionReplayTrace({
			runId: 'older-richer-run',
			analyzedAt: 1_000,
			resultCount: 3,
		});
		const matchingTrace = makeDetectionReplayTrace({
			runId: 'visible-run',
			analyzedAt: analysis.analyzedAt,
			resultCount: analysis.results.length,
		});
		const revision = createPanelVisibleRevisionFromAnalysisResponse(makeAnalyzeVisibleTabOutput({
			analysis,
			replayHistory: [mismatchedTrace, matchingTrace],
			replayTrace: mismatchedTrace,
		}));

		expect(revision.replayTrace).toBeUndefined();
		expect(revision.replayHistory).toEqual([matchingTrace]);
		expect(getPanelReplayState(revision)).toMatchObject({
			kind: 'history',
			summary: { runId: 'visible-run', resultCount: 1 },
		});
	});

	it('maps durable stopped snapshots to stopped side panel controls without requiring analysis replacement', () => {
		const snapshot = makeDetectionSessionSnapshot({
			source: 'content',
			status: 'stopped',
		});

		expect(getPanelObservationModeFromSnapshot(snapshot)).toBe('stopped');
		expect(shouldKeepPanelLiveUpdatesActive(getPanelObservationModeFromSnapshot(snapshot))).toBe(false);
	});

	it('preserves replay state when a lifecycle snapshot repeats the same analysis', () => {
		const previousAnalysis = makeAnalysis([makeDetection('react')]);
		const response = makeAnalyzeVisibleTabOutput({
			analysis: previousAnalysis,
		});

		expect(shouldPreservePanelReplayState({
			previousAnalysis,
			revision: createPanelVisibleRevisionFromAnalysisResponse(response),
		})).toBe(true);
		expect(shouldPreservePanelReplayState({
			previousAnalysis,
			revision: createPanelVisibleRevisionFromAnalysisResponse({
				...response,
				replayTrace: makeDetectionReplayTrace({ resultCount: previousAnalysis.results.length }),
			}),
		})).toBe(false);
	});


	it('maps replay explanations into side panel summaries keyed by technology id', () => {
		const lookup = buildPanelExplanationLookup({
			schemaVersion: 1,
			target: { url: 'https://example.com/products', hostname: 'example.com' },
			requestedMode: 'event',
			completedMode: 'event',
			analyzedAt: 1_700_000_000_000,
			resultCount: 1,
			events: [],
			explanations: [{
				technologyId: 'react',
				name: 'React',
				categories: ['ui-library'],
				confidence: { value: 95, level: 'certain' },
				inferred: false,
				evidenceCount: 2,
				directEvidenceCount: 2,
				relationshipEvidenceCount: 0,
				reasons: ['Matched scriptSrc evidence', 'Selected version 18.3.1'],
				evidence: [
					{ kind: 'scriptSrc', confidence: 95, direct: true, matchedValue: 'react.js' },
				],
				warnings: [],
			}],
		});

		expect(lookup.react).toMatchObject({
			headline: 'Matched 2 direct signals.',
			primaryEvidenceKind: 'scriptSrc',
			reasons: ['Matched scriptSrc evidence', 'Selected version 18.3.1'],
			evidence: [{ kind: 'scriptSrc', direct: true, matchedValue: 'react.js' }],
		});
	});

	it('formats application errors for side panel recovery UI', () => {
		expect(formatPanelAppError({
			code: 'UNSUPPORTED_URL',
			message: 'Detection only works on normal http/https pages.',
		})).toBe('UNSUPPORTED_URL: Detection only works on normal http/https pages.');
	});
});
