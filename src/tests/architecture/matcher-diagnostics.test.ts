import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const MATCHER_WORKER = fileURLToPath(new URL('../../entrypoints/offscreen/matcher.worker.ts', import.meta.url));
const OFFSCREEN_HOST = fileURLToPath(new URL('../../entrypoints/offscreen/main.ts', import.meta.url));
const OFFSCREEN_LIFECYCLE = fileURLToPath(new URL('../../lib/lifecycle/offscreen-matcher.ts', import.meta.url));
const MATCHER_CONTRACTS = fileURLToPath(new URL('../../lib/matcher/contracts.ts', import.meta.url));
const BACKGROUND_RUNTIME = fileURLToPath(new URL('../../lib/background/runtime.ts', import.meta.url));
const BACKGROUND_ENTRYPOINT = fileURLToPath(new URL('../../entrypoints/background.ts', import.meta.url));
const CONTENT_ENTRYPOINT = fileURLToPath(new URL('../../entrypoints/content.ts', import.meta.url));

describe('matcher worker diagnostics', () => {
	it('keeps performance diagnostics out of Chrome extension warning records', () => {
		const source = readFileSync(MATCHER_WORKER, 'utf8');

		expect(source).toContain("matcherWorkerLogger.debug(");
		expect(source).toContain("matcherWorkerLogger.isEnabledFor('trace')");
		expect(source).toContain('matcherWorkerLogger.trace(formatSlowRuleEvaluationMessage(summary)');
		expect(source).not.toContain('matcherWorkerLogger.warn(');
		expect(source).not.toContain('Slow matcher partition in worker:');
	});

	it('separates shard hydration from semantic matcher duration', () => {
		const source = readFileSync(MATCHER_WORKER, 'utf8');

		expect(source).toContain('shardLoadDurationMs');
		expect(source).toContain('matchDurationMs');
		expect(source).toContain('totalDurationMs');
		expect(source).toContain('shardCacheHit');
	});

	it('redacts page-derived values before they enter performance logs', () => {
		const source = readFileSync(MATCHER_WORKER, 'utf8');

		expect(source).toContain('redactEvidenceValue(value, 240)');
		expect(source).toContain('expectedUrlPreview: previewLogValue(task.job.expectedUrl)');
		expect(source).not.toContain('expectedUrl: task.job.expectedUrl');
		expect(source).not.toContain('observationValue: observation.value');
		expect(source).not.toContain('observationAttributes: observation.attributes');
	});

	it('bounds worker shard retention and tears down idle matcher worker heaps', () => {
		const worker = readFileSync(MATCHER_WORKER, 'utf8');
		const host = readFileSync(OFFSCREEN_HOST, 'utf8');

		expect(worker).toContain('MAX_CACHED_OBSERVATION_KIND_SHARDS = 4');
		expect(worker).toContain('maxObservationKindShards: MAX_CACHED_OBSERVATION_KIND_SHARDS');
		expect(host).toContain('MATCHER_WORKER_IDLE_MS = 30_000');
		expect(host).toContain('pool.dispose(reason)');
		expect(host).toContain("event: 'matcher-worker-pool-created'");
		expect(host).toContain("event: 'matcher-worker-pool-disposed'");
		expect(host).toContain('MATCHER_WORKER_IDLE_MS}ms idle limit');
	});


	it('keeps registry-scale matcher state out of queued offscreen messages and the offscreen host heap', () => {
		const lifecycle = readFileSync(OFFSCREEN_LIFECYCLE, 'utf8');
		const contracts = readFileSync(MATCHER_CONTRACTS, 'utf8');
		const host = readFileSync(OFFSCREEN_HOST, 'utf8');

		expect(contracts).toContain('export type OffscreenMatcherJobRequest = Pick<');
		expect(contracts).toContain('export interface OffscreenMatcherJobResult');
		expect(contracts).toContain("'job' | 'mode' | 'batch' | 'options' | 'maxWorkerCount'");
		expect(lifecycle).toContain('request: createOffscreenMatcherJobRequest(request)');
		expect(lifecycle).toContain('await cancelOffscreenMatcherJob(request.job.jobId);');
		expect(lifecycle).toContain('registry: request.registry');
		expect(lifecycle).toContain('compiledRegistryArtifact: { relationshipGraph: request.relationshipGraph }');
		expect(host).not.toContain('createPackagedTechnologyRegistryProvider');
		expect(host).not.toContain('createCompiledDetectionRegistry');
		expect(host).not.toContain('createMatcherPipelineResult');
		expect(host).not.toContain('request.registry');
		expect(host).not.toContain('request.relationshipGraph');
		expect(host).not.toContain('request.index');
	});

	it('terminates active matcher workers on cancellation or failure instead of leaving duplicate work alive', () => {
		const host = readFileSync(OFFSCREEN_HOST, 'utf8');

		expect(host).toContain('#activeReject');
		expect(host).toContain("disposeMatcherResources('Matcher job was canceled.')");
		expect(host).toContain("disposeMatcherResources(error instanceof Error ? error.message : 'Matcher job failed.')");
		expect(host).toContain('this.#activeReject?.(new Error(reason))');
	});

	it('cancels inactive-tab matcher work and retains full observation batches only for live observers', () => {
		const runtime = readFileSync(BACKGROUND_RUNTIME, 'utf8');
		const background = readFileSync(BACKGROUND_ENTRYPOINT, 'utf8');

		expect(runtime).toContain('const observationRefreshBaselineByTab = new Map<number, ObservationRefreshBaseline>()');
		expect(runtime).not.toContain('eventObservationBatchByTab');
		expect(runtime).toContain("void cancelMatcherJob(jobId, 'tab-deactivated')");
		expect(runtime).toContain('if (current.active === false || !current.url)');
		expect(background).toContain('backgroundRuntime.onTabActivated(tabId, windowId)');
	});

	it('stops content observation by exact session identity in one content RPC', () => {
		const runtime = readFileSync(BACKGROUND_RUNTIME, 'utf8');
		const content = readFileSync(CONTENT_ENTRYPOINT, 'utf8');

		expect(runtime).toContain('contentApi.stopObservationSession(target)');
		expect(content).toContain('active.sessionId !== input.sessionId');
		expect(content).toContain('url.sameDocument(active.expectedUrl, input.expectedUrl)');
		expect(content).toContain('The requested observation session no longer owns this content runtime.');
		expect(runtime).not.toContain('contentApi.stopObservationSession()');
	});

	it('relays dedicated-worker diagnostics through the offscreen host', () => {
		const host = readFileSync(OFFSCREEN_HOST, 'utf8');

		expect(host).toContain('isDiagnosticTransportMessage(event.data)');
		expect(host).toContain('forwardMatcherWorkerDiagnostic(event.data)');
		expect(host).toContain('browser.runtime.sendMessage(message)');
	});
});
