import { describe, expect, it } from 'vitest';

import {
	buildPopupAnalysisUpdate,
	buildPopupExplanationLookup,
	createPopupVisibleRevisionFromAnalysisResponse,
	formatPopupAppError,
	getPopupReplayState,
	getPopupAnalysisActivity,
	getPopupMatcherStatusFromSnapshot,
	getPopupObservationLabel,
	getPopupObservationModeFromAnalysis,
	getPopupObservationModeFromSession,
	getPopupObservationModeFromSnapshot,
	groupDetectionsByPrimaryCategory,
	isPopupVisibleRevisionPending,
	shouldApplyPopupReplayState,
	shouldApplyPopupSnapshotRevision,
	shouldKeepPopupLiveUpdatesActive,
	shouldPreservePopupReplayState,
} from '@/lib/popup/view-model';
import {
	makeAnalysis,
	makeAnalyzeVisibleTabOutput,
	makeDetection,
	makeDetectionReplayTrace,
	makeDetectionSessionSnapshot,
	makeObservationSession,
} from '../support/factories';

describe('popup view model', () => {
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

		expect(getPopupObservationModeFromAnalysis(response)).toBe('idle');
		expect(shouldKeepPopupLiveUpdatesActive('idle')).toBe(false);
		expect(getPopupObservationLabel('idle')).toBe('Idle');
	});

	it('maps observing and dirty sessions to active popup live updates', () => {
		expect(getPopupObservationModeFromSession(makeObservationSession('observing'))).toBe('active');
		expect(getPopupObservationModeFromSession(makeObservationSession('dirty'))).toBe('active');
		expect(shouldKeepPopupLiveUpdatesActive('active')).toBe(true);
		expect(getPopupObservationLabel('active')).toBe('Observing');
	});

	it('maps stopped sessions to stopped popup controls', () => {
		expect(getPopupObservationModeFromSession(makeObservationSession('stopped'))).toBe('stopped');
		expect(shouldKeepPopupLiveUpdatesActive('stopped')).toBe(false);
		expect(getPopupObservationLabel('stopped')).toBe('Stopped');
	});

	it('describes queued visible-tab work ahead of stale matcher work', () => {
		const activity = getPopupAnalysisActivity({
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

	it('keeps the popup in a loading state while the current tab request has no matcher revision yet', () => {
		const activity = getPopupAnalysisActivity({
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
		const activity = getPopupAnalysisActivity({
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
		const activity = getPopupAnalysisActivity({
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

		expect(getPopupMatcherStatusFromSnapshot(partialSnapshot)).toBe('matching');
		expect(getPopupMatcherStatusFromSnapshot(finalSnapshot)).toBe('idle');
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

		expect(getPopupMatcherStatusFromSnapshot(snapshot)).toBe('matching');
	});

	it('treats stored partial snapshot revisions as pending and blocks stale replay state', () => {
		const pendingRevision = createPopupVisibleRevisionFromAnalysisResponse(makeAnalyzeVisibleTabOutput({
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
		const finalRevision = createPopupVisibleRevisionFromAnalysisResponse(makeAnalyzeVisibleTabOutput({
			analysis: makeAnalysis([makeDetection('react')]),
			replayTrace: makeDetectionReplayTrace({ resultCount: 1 }),
		}));

		expect(isPopupVisibleRevisionPending(pendingRevision)).toBe(true);
		expect(shouldApplyPopupReplayState(pendingRevision)).toBe(false);
		expect(isPopupVisibleRevisionPending(storedPartialRevision)).toBe(true);
		expect(shouldApplyPopupReplayState(storedPartialRevision)).toBe(false);
		expect(isPopupVisibleRevisionPending(storedCacheRevision)).toBe(false);
		expect(isPopupVisibleRevisionPending(finalRevision)).toBe(false);
		expect(shouldApplyPopupReplayState(finalRevision)).toBe(true);
	});

	it('builds a manual refresh notice while preserving active observation state', () => {
		const response = makeAnalyzeVisibleTabOutput({
			analysis: makeAnalysis([makeDetection('react')]),
			session: makeObservationSession('observing'),
		});

		const update = buildPopupAnalysisUpdate({
			previousAnalysis: null,
			revision: createPopupVisibleRevisionFromAnalysisResponse(response),
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

		const update = buildPopupAnalysisUpdate({
			previousAnalysis: null,
			revision: createPopupVisibleRevisionFromAnalysisResponse(response),
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

		const update = buildPopupAnalysisUpdate({
			previousAnalysis,
			revision: createPopupVisibleRevisionFromAnalysisResponse(response),
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

		expect(shouldApplyPopupSnapshotRevision({ currentAnalysis, snapshot })).toBe(false);
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

		expect(shouldApplyPopupSnapshotRevision({ currentAnalysis, snapshot: partialSnapshot })).toBe(false);
		expect(shouldApplyPopupSnapshotRevision({ currentAnalysis, snapshot: finalSnapshot })).toBe(true);
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

		expect(shouldApplyPopupSnapshotRevision({ currentAnalysis, snapshot: recoveredSnapshot })).toBe(false);
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
		const revision = createPopupVisibleRevisionFromAnalysisResponse(makeAnalyzeVisibleTabOutput({
			analysis,
			replayHistory: [mismatchedTrace, matchingTrace],
			replayTrace: mismatchedTrace,
		}));

		expect(revision.replayTrace).toBeUndefined();
		expect(revision.replayHistory).toEqual([matchingTrace]);
		expect(getPopupReplayState(revision)).toMatchObject({
			kind: 'history',
			summary: { runId: 'visible-run', resultCount: 1 },
		});
	});

	it('maps durable stopped snapshots to stopped popup controls without requiring analysis replacement', () => {
		const snapshot = makeDetectionSessionSnapshot({
			source: 'content',
			status: 'stopped',
		});

		expect(getPopupObservationModeFromSnapshot(snapshot)).toBe('stopped');
		expect(shouldKeepPopupLiveUpdatesActive(getPopupObservationModeFromSnapshot(snapshot))).toBe(false);
	});

	it('preserves replay state when a lifecycle snapshot repeats the same analysis', () => {
		const previousAnalysis = makeAnalysis([makeDetection('react')]);
		const response = makeAnalyzeVisibleTabOutput({
			analysis: previousAnalysis,
		});

		expect(shouldPreservePopupReplayState({
			previousAnalysis,
			revision: createPopupVisibleRevisionFromAnalysisResponse(response),
		})).toBe(true);
		expect(shouldPreservePopupReplayState({
			previousAnalysis,
			revision: createPopupVisibleRevisionFromAnalysisResponse({ ...response, replayTrace: makeDetectionReplayTrace() }),
		})).toBe(false);
	});


	it('maps replay explanations into popup summaries keyed by technology id', () => {
		const lookup = buildPopupExplanationLookup({
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

	it('formats application errors for popup recovery UI', () => {
		expect(formatPopupAppError({
			code: 'UNSUPPORTED_URL',
			message: 'Detection only works on normal http/https pages.',
		})).toBe('UNSUPPORTED_URL: Detection only works on normal http/https pages.');
	});
});
