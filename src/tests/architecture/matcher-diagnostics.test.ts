import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const MATCHER_WORKER = fileURLToPath(new URL('../../entrypoints/offscreen/matcher.worker.ts', import.meta.url));
const OFFSCREEN_ENTRY = fileURLToPath(new URL('../../entrypoints/offscreen/main.ts', import.meta.url));
const OFFSCREEN_CLIENT = fileURLToPath(new URL('../../lib/matcher/offscreen/client.ts', import.meta.url));
const OFFSCREEN_HOST = fileURLToPath(new URL('../../lib/matcher/offscreen/host.ts', import.meta.url));
const OFFSCREEN_POOL = fileURLToPath(new URL('../../lib/matcher/offscreen/pool.ts', import.meta.url));
const OFFSCREEN_QUEUE = fileURLToPath(new URL('../../lib/matcher/offscreen/queue.ts', import.meta.url));
const OFFSCREEN_DEVELOPMENT = fileURLToPath(new URL('../../lib/matcher/offscreen/development.ts', import.meta.url));
const OLD_OFFSCREEN_LIFECYCLE = fileURLToPath(new URL('../../lib/lifecycle/offscreen-matcher.ts', import.meta.url));
const OLD_DOM_MATCHER = fileURLToPath(new URL('../../lib/content/dom-selectors.ts', import.meta.url));
const MATCHER_CONTRACTS = fileURLToPath(new URL('../../lib/matcher/contracts.ts', import.meta.url));
const BACKGROUND_RUNTIME = fileURLToPath(new URL('../../lib/background/runtime.ts', import.meta.url));
const BACKGROUND_ENTRYPOINT = fileURLToPath(new URL('../../entrypoints/background.ts', import.meta.url));
const CONTENT_ENTRYPOINT = fileURLToPath(new URL('../../entrypoints/content.ts', import.meta.url));

function read(path: string): string {
	return readFileSync(path, 'utf8');
}

describe('matcher worker diagnostics', () => {
	it('keeps performance diagnostics out of Chrome extension warning records', () => {
		const source = read(MATCHER_WORKER);

		expect(source).toContain('matcherWorkerLogger.debug(');
		expect(source).toContain("matcherWorkerLogger.isEnabledFor('trace')");
		expect(source).toContain('matcherWorkerLogger.trace(formatSlowRuleEvaluationMessage(summary)');
		expect(source).not.toContain('matcherWorkerLogger.warn(');
		expect(source).not.toContain('Slow matcher partition in worker:');
	});

	it('separates shard hydration from semantic matcher duration', () => {
		const source = read(MATCHER_WORKER);

		expect(source).toContain('shardLoadDurationMs');
		expect(source).toContain('matchDurationMs');
		expect(source).toContain('totalDurationMs');
		expect(source).toContain('shardCacheHit');
	});

	it('redacts page-derived values before they enter performance logs', () => {
		const source = read(MATCHER_WORKER);

		expect(source).toContain('redactEvidenceValue(value, 240)');
		expect(source).toContain('expectedUrlPreview: previewLogValue(task.job.expectedUrl)');
		expect(source).not.toContain('expectedUrl: task.job.expectedUrl');
		expect(source).not.toContain('observationValue: observation.value');
		expect(source).not.toContain('observationAttributes: observation.attributes');
	});

	it('bounds both worker shard retention and queued observation batches', () => {
		const worker = read(MATCHER_WORKER);
		const host = read(OFFSCREEN_HOST);
		const queue = read(OFFSCREEN_QUEUE);

		expect(worker).toContain('MAX_CACHED_OBSERVATION_KIND_SHARDS = 4');
		expect(worker).toContain('maxObservationKindShards: MAX_CACHED_OBSERVATION_KIND_SHARDS');
		expect(host).toContain('MAX_QUEUED_JOBS = 8');
		expect(host).toContain('limit: MAX_QUEUED_JOBS');
		expect(queue).toContain('new QueueFullError(options.limit)');
		expect(queue).toContain('entry?.reject(new Error(\'Matcher job was canceled before dispatch.\'))');
	});

	it('releases idle dedicated-worker heaps', () => {
		const host = read(OFFSCREEN_HOST);

		expect(host).toContain('WORKER_IDLE_MS = 30_000');
		expect(host).toContain('pool.dispose(reason)');
		expect(host).toContain("event: 'matcher-worker-pool-created'");
		expect(host).toContain("event: 'matcher-worker-pool-disposed'");
		expect(host).toContain('WORKER_IDLE_MS}ms idle limit');
	});

	it('keeps registry-scale matcher state out of cross-context requests and the offscreen host', () => {
		const client = read(OFFSCREEN_CLIENT);
		const contracts = read(MATCHER_CONTRACTS);
		const host = read(OFFSCREEN_HOST);

		expect(contracts).toContain('export type OffscreenMatcherJobRequest = Pick<');
		expect(contracts).toContain("'job' | 'mode' | 'batch' | 'options' | 'maxWorkerCount'");
		expect(client).toContain('request: compact(request)');
		expect(client).toContain('registry: request.registry');
		expect(client).toContain('compiledRegistryArtifact: { relationshipGraph: request.relationshipGraph }');
		expect(host).not.toContain('createPackagedTechnologyRegistryProvider');
		expect(host).not.toContain('createCompiledDetectionRegistry');
		expect(host).not.toContain('createMatcherPipelineResult');
		expect(host).not.toContain('request.registry');
		expect(host).not.toContain('request.relationshipGraph');
		expect(host).not.toContain('request.index');
	});

	it('terminates active matcher workers on cancellation or failure', () => {
		const host = read(OFFSCREEN_HOST);
		const pool = read(OFFSCREEN_POOL);

		expect(host).toContain("this.#dispose('Matcher job was canceled.')");
		expect(host).toContain("this.#dispose(error instanceof Error ? error.message : 'Matcher job failed.')");
		expect(pool).toContain('#activeReject');
		expect(pool).toContain('this.#activeReject?.(new Error(reason))');
		expect(pool).toContain('this.#worker.terminate()');
	});

	it('uses separate queue and execution deadlines', () => {
		const client = read(OFFSCREEN_CLIENT);

		expect(client).toContain('QUEUE_TIMEOUT_MS = 120_000');
		expect(client).toContain('RUN_TIMEOUT_MS = 120_000');
		expect(client).toContain("message.phase !== 'running'");
		expect(client).toContain('arm(RUN_TIMEOUT_MS)');
		expect(client).toContain('browser.runtime.onMessage.addListener(onMessage)');
		expect(client.indexOf('browser.runtime.onMessage.addListener(onMessage)')).toBeLessThan(client.indexOf('response = send()'));
	});

	it('keeps DOM parsing out of the offscreen host and closes an idle WORKERS document', () => {
		const client = read(OFFSCREEN_CLIENT);
		const host = read(OFFSCREEN_HOST);
		const entry = read(OFFSCREEN_ENTRY);

		expect(`${client}\n${host}\n${entry}`).not.toContain('DOMParser');
		expect(`${client}\n${host}\n${entry}`).not.toContain('parseFromString');
		expect(client).toContain('reasons: [offscreen.Reason.WORKERS]');
		expect(client).not.toContain('offscreen.Reason.DOM_PARSER');
		expect(client).toContain('IDLE_MS = 30_000');
		expect(client).toContain('await offscreen.closeDocument()');
		expect(client).toContain("event: 'matcher-offscreen-document-closed'");
		expect(read(BACKGROUND_ENTRYPOINT)).toContain('offscreen.close');
	});

	it('keeps the background matcher implementation development-only', () => {
		const client = read(OFFSCREEN_CLIENT);
		const development = read(OFFSCREEN_DEVELOPMENT);
		const contracts = read(MATCHER_CONTRACTS);

		expect(client).toContain('if (import.meta.env.DEV) return await development.run(request)');
		expect(client).not.toContain('background-fallback');
		expect(development).toContain("executor: 'development-background'");
		expect(contracts).toContain("'offscreen-worker-pool' | 'development-background'");
		expect(contracts).not.toContain('background-fallback');
	});

	it('keeps the offscreen entrypoint as composition instead of matcher ownership', () => {
		const entry = read(OFFSCREEN_ENTRY);

		expect(entry).toContain('host.start()');
		expect(entry).not.toContain('queuedJobs');
		expect(entry).not.toContain('new Worker');
		expect(entry).not.toContain('createMatcherPartitionTasks');
	});

	it('removes the obsolete matcher lifecycle and DOM serialization modules', () => {
		expect(existsSync(OLD_OFFSCREEN_LIFECYCLE)).toBe(false);
		expect(existsSync(OLD_DOM_MATCHER)).toBe(false);
	});

	it('cancels inactive-tab matcher work and retains full observation batches only for live observers', () => {
		const runtime = read(BACKGROUND_RUNTIME);
		const background = read(BACKGROUND_ENTRYPOINT);

		expect(runtime).toContain('const observationRefreshBaselineByTab = new Map<number, ObservationRefreshBaseline>()');
		expect(runtime).not.toContain('eventObservationBatchByTab');
		expect(runtime).toContain("void cancelMatcherJob(jobId, 'tab-deactivated')");
		expect(runtime).toContain('if (current.active === false || !current.url)');
		expect(background).toContain('backgroundRuntime.onTabActivated(tabId, windowId)');
	});

	it('stops content observation by exact session identity in one content RPC', () => {
		const runtime = read(BACKGROUND_RUNTIME);
		const content = read(CONTENT_ENTRYPOINT);

		expect(runtime).toContain('contentApi.stopObservationSession(target)');
		expect(content).toContain('active.sessionId !== input.sessionId');
		expect(content).toContain('url.sameDocument(active.expectedUrl, input.expectedUrl)');
		expect(content).toContain('The requested observation session no longer owns this content runtime.');
		expect(runtime).not.toContain('contentApi.stopObservationSession()');
	});

	it('relays dedicated-worker diagnostics through the offscreen pool', () => {
		const pool = read(OFFSCREEN_POOL);

		expect(pool).toContain('isDiagnosticTransportMessage(event.data)');
		expect(pool).toContain('forwardDiagnostic(event.data)');
		expect(pool).toContain('browser.runtime.sendMessage(message)');
	});
});
