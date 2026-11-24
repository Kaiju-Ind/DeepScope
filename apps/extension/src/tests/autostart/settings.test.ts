import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

describe('automatic scan setting', { concurrent: false }, () => {
	it('defaults to enabled when no preference has been stored', async () => {
		const get = vi.fn(async () => ({}));
		vi.doMock('wxt/browser', () => ({
			browser: { storage: { local: { get, set: vi.fn() } } },
		}));
		const settings = await import('@/lib/autostart/settings');

		await expect(settings.getAutoScanEnabled()).resolves.toBe(true);
	});

	it('reads and persists an explicit disabled preference', async () => {
		const set = vi.fn(async () => undefined);
		vi.doMock('wxt/browser', () => ({
			browser: {
				storage: {
					local: {
						get: vi.fn(async () => ({
							'kaiju-deepscope.settings.auto-scan-enabled.v1': false,
						})),
						set,
					},
				},
			},
		}));
		const settings = await import('@/lib/autostart/settings');

		await expect(settings.getAutoScanEnabled()).resolves.toBe(false);
		await settings.setAutoScanEnabled(false);
		expect(set).toHaveBeenCalledWith({
			[settings.AUTO_SCAN_ENABLED_STORAGE_KEY]: false,
		});
	});
});
