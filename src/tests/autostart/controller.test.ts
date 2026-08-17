import { describe, expect, it, vi } from 'vitest';

import { createAutoScanController } from '@/lib/autostart/controller';
import type { AnalyzeVisibleTabOutput, VisibleTabIdentity } from '@/lib/messaging';
import { errorResponse, extensionSuccess } from '@/lib/messaging/result';

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

function makeOutput(): AnalyzeVisibleTabOutput {
	return {
		analysis: {
			url: VISIBLE_IDENTITY.url,
			hostname: VISIBLE_IDENTITY.hostname,
			analyzedAt: 1_700_000_000_000,
			results: [],
			errors: [],
			source: 'fresh',
		},
		snapshot: {
			status: 'bypassed',
			key: `analysis:${VISIBLE_IDENTITY.url}`,
		},
	};
}

describe('automatic scan controller', () => {
	it('starts a bounded fresh scan for an enabled visible page load', async () => {
		const analyzeVisibleTab = vi.fn(async () => extensionSuccess(makeOutput()));
		const controller = createAutoScanController({
			getEnabled: vi.fn(async () => true),
			getVisibleTabIdentity: vi.fn(async () => extensionSuccess(VISIBLE_IDENTITY)),
			analyzeVisibleTab,
		});

		await controller.scanVisibleTab(VISIBLE_IDENTITY.tabId, 3, 'refresh', 'page-load');

		expect(analyzeVisibleTab).toHaveBeenCalledOnce();
		expect(analyzeVisibleTab).toHaveBeenCalledWith({
			target: VISIBLE_IDENTITY,
			mode: 'refresh',
			observe: 'bounded',
		});
	});

	it('does nothing when automatic scanning is disabled', async () => {
		const analyzeVisibleTab = vi.fn(async () => extensionSuccess(makeOutput()));
		const controller = createAutoScanController({
			getEnabled: vi.fn(async () => false),
			getVisibleTabIdentity: vi.fn(async () => extensionSuccess(VISIBLE_IDENTITY)),
			analyzeVisibleTab,
		});

		await controller.scanVisibleTab(VISIBLE_IDENTITY.tabId, 3, 'refresh', 'page-load');

		expect(analyzeVisibleTab).not.toHaveBeenCalled();
	});

	it('drops a scan when the requested tab is no longer active', async () => {
		const analyzeVisibleTab = vi.fn(async () => extensionSuccess(makeOutput()));
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
			return extensionSuccess(makeOutput());
		});
		const controller = createAutoScanController({
			getEnabled: vi.fn(async () => true),
			getVisibleTabIdentity: vi.fn(async () => extensionSuccess(VISIBLE_IDENTITY)),
			analyzeVisibleTab,
		});

		const pageLoad = controller.scanVisibleTab(VISIBLE_IDENTITY.tabId, 3, 'refresh', 'page-load');
		const activation = controller.scanVisibleTab(VISIBLE_IDENTITY.tabId, 3, 'snapshot-first', 'tab-activated');
		await vi.waitFor(() => expect(analyzeVisibleTab).toHaveBeenCalledOnce());
		resolveAnalysis?.();
		await Promise.all([pageLoad, activation]);

		expect(analyzeVisibleTab).toHaveBeenCalledOnce();
	});
});
