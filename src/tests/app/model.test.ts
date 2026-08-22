import { describe, expect, it } from 'vitest';

import {
	buildAnalysisUpdate,
	buildExplanationLookup,
	createVisibleRevisionFromAnalysisResponse,
	formatError,
	getReplayState,
	getAnalysisActivity,
	getMatcherStatusFromSnapshot,
	getObservationLabel,
	getObservationModeFromAnalysis,
	getObservationModeFromSession,
	getObservationModeFromSnapshot,
	groupDetectionsByPrimaryCategory,
	isVisibleRevisionPending,
	shouldApplyReplayState,
	shouldApplySnapshotRevision,
	shouldKeepLiveUpdatesActive,
	shouldPreserveReplayState,
} from '@/app/model';
import {
	makeAnalysis,
	makeAnalyzeVisibleTabOutput,
	makeDetection,
	makeDetectionReplayTrace,
	makeDetectionSessionSnapshot,
	makeObservationSession,
} from '../support/factories';

describe('side panel model', () => {
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

		expect(getObservationModeFromAnalysis(response)).toBe('idle');
		expect(shouldKeepLiveUpdatesActive('idle')).toBe(false);
		expect(getObservationLabel('idle')).toBe('Idle');
	});

	it('maps observing and dirty sessions to active side panel live updates', () => {
		expect(getObservationModeFromSession(makeObservationSession('observing'))).toBe('active');
		expect(getObservationModeFromSession(makeObservationSession('dirty'))).toBe('active');
		expect(shouldKeepLiveUpdatesActive('active')).toBe(true);
		expect(getObservationLabel('active')).toBe('Observing');
	});

	it('maps stopped sessions to stopped side panel controls', () => {
		expect(getObservationModeFromSession(makeObservationSession('stopped'))).toBe('stopped');
		expect(shouldKeepLiveUpdatesActive('stopped')).toBe(false);
		expect(getObservationLabel('stopped')).toBe('Stopped');
	});

	it('describes queued visible-tab work ahead of stale matcher work', () => {
		const activity = getAnalysisActivity({
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
		const activity = getAnalysisActivity({
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
		const activity = getAnalysisActivity({
			matcherStatus: 'matching',
			workflowBusy: false,
			analysisRequestInFlight: false,
			queuedVisibleAnalysis: false,
			matcherProgress: {
				phase: 'matching',
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
			progress: { kind: 'determinate', completed: 7, total: 12, percent: 58 },
		});
	});

	it('reports complete when no visible tab workflow owns progress', () => {
		const activity = getAnalysisActivity({
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

		expect(getMatcherStatusFromSnapshot(partialSnapshot)).toBe('matching');
		expect(getMatcherStatusFromSnapshot(finalSnapshot)).toBe('idle');
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
				phase: 'matching',
				completedPartitionCount: 2,
				partitionCount: 8,
				resultCount: 3,
				updatedAt: 1_700_000_000_500,
			},
		});

		expect(getMatcherStatusFromSnapshot(snapshot)).toBe('matching');
	});

	it('maps queue and recording snapshot receipts to their exact visible stages', () => {
		const queued = makeDetectionSessionSnapshot({
			source: 'background',
			status: 'complete',
			matcherProgress: {
				jobId: 'job-queued',
				mode: 'complete',
				phase: 'queued',
				queuePosition: 2,
				queueDepth: 4,
				completedPartitionCount: 0,
				partitionCount: 0,
				resultCount: 1,
				updatedAt: 1_700_000_000_100,
			},
		});
		const recording = makeDetectionSessionSnapshot({
			source: 'background',
			status: 'complete',
			matcherProgress: {
				jobId: 'job-recording',
				mode: 'complete',
				phase: 'recording',
				completedPartitionCount: 8,
				partitionCount: 8,
				resultCount: 3,
				updatedAt: 1_700_000_000_200,
			},
		});

		expect(getMatcherStatusFromSnapshot(queued)).toBe('queued');
		expect(getMatcherStatusFromSnapshot(recording)).toBe('recording');
		expect(getAnalysisActivity({
			matcherStatus: 'queued',
			workflowBusy: false,
			analysisRequestInFlight: false,
			queuedVisibleAnalysis: false,
			matcherProgress: queued.matcherProgress,
		})).toMatchObject({
			headline: 'Waiting for matcher capacity',
			label: 'waiting for matcher 2/4',
		});
		expect(getAnalysisActivity({
			matcherStatus: 'recording',
			workflowBusy: false,
			analysisRequestInFlight: false,
			queuedVisibleAnalysis: false,
			matcherProgress: recording.matcherProgress,
		})).toMatchObject({
			headline: 'Recording replay trace',
			label: 'recording replay',
		});
	});

	it('treats stored partial snapshot revisions as pending and blocks stale replay state', () => {
		const pendingRevision = createVisibleRevisionFromAnalysisResponse(makeAnalyzeVisibleTabOutput({
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
		const finalRevision = createVisibleRevisionFromAnalysisResponse(makeAnalyzeVisibleTabOutput({
			analysis: makeAnalysis([makeDetection('react')]),
			replayTrace: makeDetectionReplayTrace({ resultCount: 1 }),
		}));

		expect(isVisibleRevisionPending(pendingRevision)).toBe(true);
		expect(shouldApplyReplayState(pendingRevision)).toBe(false);
		expect(isVisibleRevisionPending(storedPartialRevision)).toBe(true);
		expect(shouldApplyReplayState(storedPartialRevision)).toBe(false);
		expect(isVisibleRevisionPending(storedCacheRevision)).toBe(false);
		expect(isVisibleRevisionPending(finalRevision)).toBe(false);
		expect(shouldApplyReplayState(finalRevision)).toBe(true);
	});

	it('builds a manual refresh notice while preserving active observation state', () => {
		const response = makeAnalyzeVisibleTabOutput({
			analysis: makeAnalysis([makeDetection('react')]),
			session: makeObservationSession('observing'),
		});

		const update = buildAnalysisUpdate({
			previousAnalysis: null,
			revision: createVisibleRevisionFromAnalysisResponse(response),
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

		const update = buildAnalysisUpdate({
			previousAnalysis: null,
			revision: createVisibleRevisionFromAnalysisResponse(response),
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

		const update = buildAnalysisUpdate({
			previousAnalysis,
			revision: createVisibleRevisionFromAnalysisResponse(response),
			source: 'auto',
			currentLateDetectionIds: ['shopify'],
		});

		expect(update.addedDetectionIds).toEqual(['shopify']);
		expect(update.lateDetectionIds).toEqual(['shopify']);
		expect(update.notice?.text).toBe('Late analysis found 1 additional detection on example.com.');
	});


	it('ignores empty content lifecycle snapshots when detector output is already visible', () => {
		const currentAnalysis = makeAnalysis([makeDetection('react')]);
		const snapshot = makeDetectionSessionSnapshot({
			source: 'content',
			status: 'observing',
			analysis: makeAnalysis([], { url: currentAnalysis.url, analyzedAt: currentAnalysis.analyzedAt }),
		});

		expect(shouldApplySnapshotRevision({ currentAnalysis, snapshot })).toBe(false);
	});

	it('treats same-page content revisions as lifecycle-only even when they preserve detector results', () => {
		const currentAnalysis = makeAnalysis([makeDetection('react'), makeDetection('vite')]);
		const snapshot = makeDetectionSessionSnapshot({
			source: 'content',
			status: 'observing',
			analysis: makeAnalysis(currentAnalysis.results, { url: currentAnalysis.url, analyzedAt: currentAnalysis.analyzedAt }),
		});

		expect(shouldApplySnapshotRevision({ currentAnalysis, snapshot })).toBe(false);
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

		expect(shouldApplySnapshotRevision({ currentAnalysis, snapshot: partialSnapshot })).toBe(false);
		expect(shouldApplySnapshotRevision({ currentAnalysis, snapshot: finalSnapshot })).toBe(true);
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

		expect(shouldApplySnapshotRevision({ currentAnalysis, snapshot: recoveredSnapshot })).toBe(false);
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
		const revision = createVisibleRevisionFromAnalysisResponse(makeAnalyzeVisibleTabOutput({
			analysis,
			replayHistory: [mismatchedTrace, matchingTrace],
			replayTrace: mismatchedTrace,
		}));

		expect(revision.replayTrace).toBeUndefined();
		expect(revision.replayHistory).toEqual([matchingTrace]);
		expect(getReplayState(revision)).toMatchObject({
			kind: 'history',
			summary: { runId: 'visible-run', resultCount: 1 },
		});
	});

	it('maps durable stopped snapshots to stopped side panel controls without requiring analysis replacement', () => {
		const snapshot = makeDetectionSessionSnapshot({
			source: 'content',
			status: 'stopped',
		});

		expect(getObservationModeFromSnapshot(snapshot)).toBe('stopped');
		expect(shouldKeepLiveUpdatesActive(getObservationModeFromSnapshot(snapshot))).toBe(false);
	});

	it('preserves replay state when a lifecycle snapshot repeats the same analysis', () => {
		const previousAnalysis = makeAnalysis([makeDetection('react')]);
		const response = makeAnalyzeVisibleTabOutput({
			analysis: previousAnalysis,
		});

		expect(shouldPreserveReplayState({
			previousAnalysis,
			revision: createVisibleRevisionFromAnalysisResponse(response),
		})).toBe(true);
		expect(shouldPreserveReplayState({
			previousAnalysis,
			revision: createVisibleRevisionFromAnalysisResponse({
				...response,
				replayTrace: makeDetectionReplayTrace({ resultCount: previousAnalysis.results.length }),
			}),
		})).toBe(false);
	});


	it('maps replay explanations into side panel summaries keyed by technology id', () => {
		const lookup = buildExplanationLookup({
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
		expect(formatError({
			code: 'UNSUPPORTED_URL',
			message: 'Detection only works on normal http/https pages.',
		})).toBe('UNSUPPORTED_URL: Detection only works on normal http/https pages.');
	});
});
