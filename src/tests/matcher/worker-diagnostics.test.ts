import { expect, it, vi } from 'vitest';

import type { TechnologyDefinition } from '@/lib/detection/types';
import type { MatcherWorkerResponseMessage, MatcherWorkerRunMessage } from '@/lib/matcher/contracts';
import {
	createObservationKindTechnologyRegistry,
	PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
	renderPackagedRegistryJson,
} from '@/lib/registry/packaged-artifacts';
import { packageMatcherIndex } from '@/lib/registry/matcher-artifact';

it.each([false, true])('keeps worker diagnostics within the job privacy policy: %s', async (incognito) => {
	const registry: readonly TechnologyDefinition[] = [{
		id: 'privacy-widget',
		name: 'Privacy Widget',
		website: 'https://privacy-widget.example',
		categories: ['framework'],
		rules: [{ kind: 'scriptSrc', pattern: /privacy-widget\.js/, confidence: 90 }],
	}];
	const technologies = createObservationKindTechnologyRegistry(registry, 'scriptSrc');
	const shard = renderPackagedRegistryJson({
		schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
		kind: 'kind-shard',
		observationKind: 'scriptSrc',
		technologies,
		ruleCount: 1,
		technologyCount: 1,
		matcherIndex: packageMatcherIndex(technologies),
		patternCount: 1,
		encodedPayloadBytes: 1,
		priority: 3,
		generatedAt: 1,
	});
	const secrets = {
		jobToken: 'job-secret-4baa',
		jobQuery: 'job-query-9f',
		keyToken: 'key-secret-39',
		keyQuery: 'key-query-77',
		valueToken: 'value-secret-51',
		valueQuery: 'value-query-27',
		attribute: 'attribute-secret-2cd',
	};
	const target = { url: `https://page.example/products?token=${secrets.jobToken}&filter=${secrets.jobQuery}`, hostname: 'page.example' };
	const request: MatcherWorkerRunMessage = {
		type: 'matcher-worker.run-partition',
		task: {
			job: { jobId: 'job-privacy', tabId: 7, windowId: 3, expectedUrl: target.url, incognito },
			partitionId: 'scriptSrc:0',
			kind: 'scriptSrc',
			priority: 3,
			observationIndexes: [4],
			batch: {
				target,
				interface: 'extension',
				observedAt: 1,
				observations: [{
					kind: 'scriptSrc',
					interface: 'extension',
					collector: 'test-fixture',
					target,
					observedAt: 1,
					key: `https://cdn.example/key?token=${secrets.keyToken}&locale=${secrets.keyQuery}`,
					value: `https://cdn.example/privacy-widget.js?api_key=${secrets.valueToken}&theme=${secrets.valueQuery}`,
					attributes: { authorization: `Bearer ${secrets.attribute}` },
				}],
			},
		},
	};
	const logger = { debug: vi.fn(), trace: vi.fn(), isEnabledFor: () => true };
	const messages: MatcherWorkerResponseMessage[] = [];
	const events = new EventTarget();
	const lifetime = new AbortController();
	const fetchAsset = vi.fn(async () => new Response(shard, { headers: { 'content-type': 'application/json' } }));

	vi.resetModules();
	vi.doMock('@/lib/diagnostics/logging', () => ({ configure: vi.fn(), get: () => logger }));
	vi.doMock('wxt/browser', () => ({ browser: {} }));
	vi.stubGlobal('location', { origin: 'chrome-extension://privacy-test' });
	vi.stubGlobal('fetch', fetchAsset);
	vi.stubGlobal('postMessage', (message: MatcherWorkerResponseMessage) => messages.push(message));
	// A real event target owns the simulated worker context, including crash hooks.
	vi.stubGlobal('addEventListener', (type: string, listener: EventListenerOrEventListenerObject) => {
		events.addEventListener(type, listener, { signal: lifetime.signal });
	});
	vi.stubGlobal('removeEventListener', events.removeEventListener.bind(events));
	vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
	// Enter slow-log branches deterministically; these values do not measure speed.
	let elapsed = 0;
	vi.spyOn(performance, 'now').mockImplementation(() => elapsed += 300);
	let disposeCrashHooks: (() => void) | undefined;
	try {
		const { installDiagnosticCrashHooks } = await import('@/lib/diagnostics/crash');
		disposeCrashHooks = () => installDiagnosticCrashHooks('matcher-worker').dispose();
		await import('@/entrypoints/offscreen/matcher.worker');
		events.dispatchEvent(new MessageEvent('message', { data: request }));
		await vi.advanceTimersByTimeAsync(0);

		expect(fetchAsset).toHaveBeenCalledExactlyOnceWith('chrome-extension://privacy-test/kaiju-deepscope-registry/registry.kind.scriptSrc.json');
		expect(messages).toHaveLength(1);
		expect(messages[0]).toMatchObject({
			type: 'matcher-worker.partition-complete',
			result: {
				job: request.task.job,
				partitionId: 'scriptSrc:0',
				observationCount: 1,
				matches: [{ observationIndex: 4, match: { technologyId: 'privacy-widget' } }],
			},
		});
		expect(logger.debug).toHaveBeenCalledOnce();
		if (incognito) {
			expect(logger.trace).not.toHaveBeenCalled();
			expect(logger.debug.mock.calls[0]?.[1]).toMatchObject({ matchCount: 1 });
			expect(logger.debug.mock.calls[0]?.[1]).not.toHaveProperty('expectedUrlPreview');
			expect(JSON.stringify(logger.debug.mock.calls)).not.toContain('page.example');
			expect(JSON.stringify(logger.debug.mock.calls)).not.toContain('cdn.example');
		} else {
			expect(logger.trace).toHaveBeenCalledOnce();
			expect(logger.trace.mock.calls[0]?.[1]).toMatchObject({
				matched: true,
				observationKey: 'https://cdn.example/key?token=[redacted]&locale=[redacted]',
				observationValuePreview: 'https://cdn.example/privacy-widget.js?api_key=[redacted]&theme=[redacted]',
			});
			expect(logger.debug.mock.calls[0]?.[1]).toMatchObject({
				expectedUrlPreview: 'https://page.example/products?token=[redacted]&filter=[redacted]',
				matchCount: 1,
			});
		}
		const emitted = JSON.stringify([...logger.trace.mock.calls, ...logger.debug.mock.calls]);
		for (const secret of Object.values(secrets)) expect(emitted).not.toContain(secret);
		expect(vi.getTimerCount()).toBe(0);
	} finally {
		disposeCrashHooks?.();
		lifetime.abort();
		vi.clearAllTimers();
		vi.useRealTimers();
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
		vi.doUnmock('@/lib/diagnostics/logging');
		vi.doUnmock('wxt/browser');
		vi.resetModules();
	}
});
