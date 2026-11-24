import { describe, expect, it, vi } from 'vitest';

import { createAutoScanController } from '@/lib/autostart/controller';
import type { AnalyzeVisibleTabInput, AnalyzeVisibleTabOutput, VisibleTabIdentity } from '@/lib/messaging';
import { errorResponse, ok } from '@/lib/messaging/result';

const VISIBLE_IDENTITY: VisibleTabIdentity = {
	windowId: 3,
	tabId: 7,
	frameId: 0,
	url: 'https://example.com/products',
	hostname: 'example.com',
	originHash: 'origin-example',
	urlHash: 'url-example-products',
	incognito: false,
};

function makeOutput(identity = VISIBLE_IDENTITY): AnalyzeVisibleTabOutput {
	return {
		analysis: {
			url: identity.url,
			hostname: identity.hostname,
			analyzedAt: 1_700_000_000_000,
			results: [],
			errors: [],
			source: 'fresh',
		},
		snapshot: {
			status: 'bypassed',
			key: `analysis:${identity.url}`,
		},
	};
}

describe('automatic scan controller', () => {
	it('runs an enabled automatic scan without leaving a live page observer', async () => {
		const analyzeVisibleTab = vi.fn(async () => ok(makeOutput()));
		const controller = createAutoScanController({
			getEnabled: vi.fn(async () => true),
			getVisibleTabIdentity: vi.fn(async () => ok(VISIBLE_IDENTITY)),
			analyzeVisibleTab,
		});

		await controller.scanVisibleTab(VISIBLE_IDENTITY.tabId, 3, 'refresh', 'page-load');

		expect(analyzeVisibleTab).toHaveBeenCalledOnce();
		expect(analyzeVisibleTab).toHaveBeenCalledWith({
			target: VISIBLE_IDENTITY,
			mode: 'refresh',
			observe: 'none',
		});
	});

	it.each([true, false])('uses the resolved privacy mode in scan diagnostics (incognito %s)', async (incognito) => {
		const identity = { ...VISIBLE_IDENTITY, incognito };
		const failure = new Error(`Cannot inspect ${identity.url}`);
		failure.name = identity.url;
		const log = vi.fn();
		const analyzeVisibleTab = vi.fn()
			.mockResolvedValueOnce(ok(makeOutput(identity)))
			.mockResolvedValueOnce(errorResponse('VALIDATION_ERROR', failure.message))
			.mockRejectedValueOnce(failure);
		const controller = createAutoScanController({
			getEnabled: async () => true,
			getVisibleTabIdentity: async () => ok(identity),
			analyzeVisibleTab,
			log,
		});

		for (let i = 0; i < 3; i++) await controller.scanVisibleTab(7, 3, 'refresh', 'page-load');

		const request = { tabId: 7, mode: 'refresh', reason: 'page-load' };
		const location = incognito ? {} : { hostname: identity.hostname };
		expect(log).toHaveBeenCalledWith('auto-scan-start', { ...request, ...location });
		expect(log).toHaveBeenCalledWith('auto-scan-queued', { ...request, ...location, resultCount: 0, snapshotStatus: 'bypassed' });
		expect(log).toHaveBeenCalledWith('auto-scan-failed', {
			...request, ...location, code: 'VALIDATION_ERROR', ...(!incognito && { message: failure.message }),
		});
		expect(log).toHaveBeenCalledWith('auto-scan-threw', {
			...request, ...(incognito ? { errorType: 'Error' } : { message: failure.message }),
		});
		if (incognito) expect(JSON.stringify(log.mock.calls)).not.toContain(identity.hostname);
	});

	it('omits page details when identity lookup rejects before privacy is known', async () => {
		const log = vi.fn();
		const controller = createAutoScanController({
			getEnabled: async () => true,
			getVisibleTabIdentity: vi.fn().mockRejectedValue(new Error(VISIBLE_IDENTITY.url)),
			analyzeVisibleTab: vi.fn(),
			log,
		});
		await controller.scanVisibleTab(7, 3, 'refresh', 'page-load');
		expect(log).toHaveBeenCalledExactlyOnceWith('auto-scan-threw', {
			tabId: 7, mode: 'refresh', reason: 'page-load', errorType: 'Error',
		});
	});

	it('omits an ordinary scan failure that can name its replacement after navigation', async () => {
		const result = Promise.withResolvers<never>();
		const log = vi.fn();
		const analyzeVisibleTab = vi.fn(() => result.promise);
		const controller = createAutoScanController({
			getEnabled: async () => true,
			getVisibleTabIdentity: async () => ok(VISIBLE_IDENTITY),
			analyzeVisibleTab,
			log,
		});
		const scan = controller.scanVisibleTab(7, 3, 'refresh', 'page-load');
		await vi.waitFor(() => expect(analyzeVisibleTab).toHaveBeenCalledOnce());
		controller.onTabNavigation(7);
		result.reject(new Error('Replaced by https://other.example/secret'));
		await scan;
		expect(log).toHaveBeenLastCalledWith('auto-scan-threw', {
			tabId: 7, mode: 'refresh', reason: 'page-load', errorType: 'Error',
		});
	});

	it('does nothing when automatic scanning is disabled', async () => {
		const analyzeVisibleTab = vi.fn(async () => ok(makeOutput()));
		const controller = createAutoScanController({
			getEnabled: vi.fn(async () => false),
			getVisibleTabIdentity: vi.fn(async () => ok(VISIBLE_IDENTITY)),
			analyzeVisibleTab,
		});

		await controller.scanVisibleTab(VISIBLE_IDENTITY.tabId, 3, 'refresh', 'page-load');

		expect(analyzeVisibleTab).not.toHaveBeenCalled();
	});

	it('drops a scan when the requested tab is no longer active', async () => {
		const analyzeVisibleTab = vi.fn(async () => ok(makeOutput()));
		const getVisibleTabIdentity = vi.fn(async () => errorResponse('NO_ACTIVE_TAB', 'The requested browser tab is no longer active.'));
		const controller = createAutoScanController({
			getEnabled: vi.fn(async () => true),
			getVisibleTabIdentity,
			analyzeVisibleTab,
		});

		await controller.scanVisibleTab(VISIBLE_IDENTITY.tabId, 3, 'refresh', 'page-load');

		expect(getVisibleTabIdentity).toHaveBeenCalledWith({ tabId: VISIBLE_IDENTITY.tabId, windowId: 3 });
		expect(analyzeVisibleTab).not.toHaveBeenCalled();
	});

	it('deduplicates concurrent page-load and activation events for the same tab', async () => {
		let resolveAnalysis: (() => void) | undefined;
		const analysisGate = new Promise<void>((resolve) => {
			resolveAnalysis = resolve;
		});
		const analyzeVisibleTab = vi.fn(async () => {
			await analysisGate;
			return ok(makeOutput());
		});
		const controller = createAutoScanController({
			getEnabled: vi.fn(async () => true),
			getVisibleTabIdentity: vi.fn(async () => ok(VISIBLE_IDENTITY)),
			analyzeVisibleTab,
		});

		const pageLoad = controller.scanVisibleTab(VISIBLE_IDENTITY.tabId, 3, 'refresh', 'page-load');
		const activation = controller.scanVisibleTab(VISIBLE_IDENTITY.tabId, 3, 'snapshot-first', 'tab-activated');
		await vi.waitFor(() => expect(analyzeVisibleTab).toHaveBeenCalledOnce());
		resolveAnalysis?.();
		await Promise.all([pageLoad, activation]);

		expect(analyzeVisibleTab).toHaveBeenCalledOnce();
	});

	it.each(['https://example.com/about', VISIBLE_IDENTITY.url])(
		'scans the replacement document at %s after the previous scan settles',
		async (url) => {
			const firstAnalysis = Promise.withResolvers<void>();
			const replacement = {
				...VISIBLE_IDENTITY,
				url,
				urlHash: url === VISIBLE_IDENTITY.url ? VISIBLE_IDENTITY.urlHash : 'replacement-url',
			};
			const getVisibleTabIdentity = vi.fn()
				.mockResolvedValueOnce(ok(VISIBLE_IDENTITY))
				.mockResolvedValueOnce(ok(replacement));
			const analyzeVisibleTab = vi.fn(async ({ target }: AnalyzeVisibleTabInput) => ok(makeOutput(target)))
				.mockImplementationOnce(async () => {
					await firstAnalysis.promise;
					return ok(makeOutput());
				});
			const controller = createAutoScanController({
				getEnabled: async () => true,
				getVisibleTabIdentity,
				analyzeVisibleTab,
			});

			const first = controller.scanVisibleTab(7, 3, 'refresh', 'page-load');
			await vi.waitFor(() => expect(analyzeVisibleTab).toHaveBeenCalledOnce());
			controller.onTabNavigation(7);
			const second = controller.scanVisibleTab(7, 3, 'refresh', 'page-load');
			const activation = controller.scanVisibleTab(7, 3, 'snapshot-first', 'tab-activated');
			firstAnalysis.resolve();
			await Promise.all([first, second, activation]);

			expect(analyzeVisibleTab).toHaveBeenCalledTimes(2);
			expect(analyzeVisibleTab).toHaveBeenLastCalledWith({
				target: replacement,
				mode: 'refresh',
				observe: 'none',
			});
		},
	);

	it('skips superseded work and scans the latest window after a rejected active scan', async () => {
		const firstAnalysis = Promise.withResolvers<void>();
		const lastIdentity = { ...VISIBLE_IDENTITY, windowId: 5, url: 'https://example.com/latest' };
		const getVisibleTabIdentity = vi.fn()
			.mockResolvedValueOnce(ok(VISIBLE_IDENTITY))
			.mockResolvedValueOnce(ok(lastIdentity));
		const analyzeVisibleTab = vi.fn(async ({ target }: AnalyzeVisibleTabInput) => ok(makeOutput(target)))
			.mockImplementationOnce(async () => {
				await firstAnalysis.promise;
				return ok(makeOutput());
			});
		const controller = createAutoScanController({
			getEnabled: async () => true,
			getVisibleTabIdentity,
			analyzeVisibleTab,
		});

		const first = controller.scanVisibleTab(7, 3, 'refresh', 'page-load');
		await vi.waitFor(() => expect(analyzeVisibleTab).toHaveBeenCalledOnce());
		controller.onTabNavigation(7);
		const superseded = controller.scanVisibleTab(7, 4, 'refresh', 'page-load');
		controller.onTabNavigation(7);
		const latest = controller.scanVisibleTab(7, 5, 'snapshot-first', 'tab-activated');
		const refresh = controller.scanVisibleTab(7, 5, 'refresh', 'page-load');
		firstAnalysis.reject(new Error('Previous content runtime disconnected'));
		await Promise.all([first, superseded, latest, refresh]);

		expect(getVisibleTabIdentity.mock.calls).toEqual([[{ tabId: 7, windowId: 3 }], [{ tabId: 7, windowId: 5 }]]);
		expect(analyzeVisibleTab).toHaveBeenCalledTimes(2);
		expect(analyzeVisibleTab).toHaveBeenLastCalledWith({
			target: lastIdentity,
			mode: 'refresh',
			observe: 'none',
		});
	});

	it('rechecks the preference before starting a queued replacement', async () => {
		const firstAnalysis = Promise.withResolvers<void>();
		const getEnabled = vi.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false);
		const getVisibleTabIdentity = vi.fn(async () => ok(VISIBLE_IDENTITY));
		const analyzeVisibleTab = vi.fn(async () => {
			await firstAnalysis.promise;
			return ok(makeOutput());
		});
		const controller = createAutoScanController({ getEnabled, getVisibleTabIdentity, analyzeVisibleTab });

		const first = controller.scanVisibleTab(7, 3, 'refresh', 'page-load');
		await vi.waitFor(() => expect(analyzeVisibleTab).toHaveBeenCalledOnce());
		controller.onTabNavigation(7);
		const replacement = controller.scanVisibleTab(7, 3, 'refresh', 'page-load');
		firstAnalysis.resolve();
		await Promise.all([first, replacement]);

		expect(getEnabled).toHaveBeenCalledTimes(2);
		expect(getVisibleTabIdentity).toHaveBeenCalledOnce();
		expect(analyzeVisibleTab).toHaveBeenCalledOnce();
	});

	it('skips an old lookup that resolves after its page has navigated', async () => {
		const firstIdentity = Promise.withResolvers<void>();
		const replacement = { ...VISIBLE_IDENTITY, url: 'https://example.com/replacement', urlHash: 'replacement-url' };
		const getVisibleTabIdentity = vi.fn(async () => ok(replacement))
			.mockImplementationOnce(async () => {
				await firstIdentity.promise;
				return ok(VISIBLE_IDENTITY);
			});
		const analyzeVisibleTab = vi.fn(async () => ok(makeOutput(replacement)));
		const controller = createAutoScanController({ getEnabled: async () => true, getVisibleTabIdentity, analyzeVisibleTab });
		const first = controller.scanVisibleTab(7, 3, 'refresh', 'page-load');
		await vi.waitFor(() => expect(getVisibleTabIdentity).toHaveBeenCalledOnce());
		controller.onTabNavigation(7);
		const second = controller.scanVisibleTab(7, 3, 'refresh', 'page-load');
		firstIdentity.resolve();
		await Promise.all([first, second]);

		expect(analyzeVisibleTab).toHaveBeenCalledExactlyOnceWith({ target: replacement, mode: 'refresh', observe: 'none' });
	});

	it('drops the queued scan at tab removal and allows a later scan to run', async () => {
		const firstAnalysis = Promise.withResolvers<void>();
		const analyzeVisibleTab = vi.fn(async () => ok(makeOutput()))
			.mockImplementationOnce(async () => {
				await firstAnalysis.promise;
				return ok(makeOutput());
			});
		const controller = createAutoScanController({
			getEnabled: async () => true,
			getVisibleTabIdentity: async () => ok(VISIBLE_IDENTITY),
			analyzeVisibleTab,
		});

		const first = controller.scanVisibleTab(7, 3, 'refresh', 'page-load');
		await vi.waitFor(() => expect(analyzeVisibleTab).toHaveBeenCalledOnce());
		controller.onTabNavigation(7);
		const removed = controller.scanVisibleTab(7, 3, 'refresh', 'page-load');
		controller.onTabRemoved(7);
		firstAnalysis.resolve();
		await Promise.all([first, removed]);

		expect(analyzeVisibleTab).toHaveBeenCalledOnce();
		await controller.scanVisibleTab(7, 3, 'refresh', 'page-load');
		expect(analyzeVisibleTab).toHaveBeenCalledTimes(2);
	});
});
