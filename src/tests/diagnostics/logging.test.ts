import { afterEach, describe, expect, it, vi } from 'vitest';

const LOGTAPE_CONFIGURED_KEY = '__kaijuDeepScopeLogTapeConfigV1';

afterEach(() => {
	vi.doUnmock('@logtape/logtape');
	vi.doUnmock('@/lib/diagnostics/build');
	vi.doUnmock('@/lib/diagnostics/journal');
	vi.resetModules();
	delete (globalThis as Record<string, unknown>)[LOGTAPE_CONFIGURED_KEY];
});

describe('diagnostic logging configuration', () => {
	it('replaces legacy LogTape configuration left by an older injected content script', async () => {
		const configureSync = vi.fn();
		const debug = vi.fn();
		vi.doMock('@logtape/logtape', () => ({
			configureSync,
			getConfig: () => ({ loggers: [] }),
			getConsoleSink: () => vi.fn(),
			getLogger: () => ({ debug }),
			getThrottlingFilter: () => () => true,
		}));
		vi.doMock('@/lib/diagnostics/build', () => ({
			getDiagnosticBuildId: () => 'build-current',
		}));
		vi.doMock('@/lib/diagnostics/journal', () => ({
			createDiagnosticJournalSink: () => vi.fn(),
		}));

		const logging = await import('@/lib/diagnostics/logging');
		logging.configure('content');

		expect(configureSync).toHaveBeenCalledTimes(1);
		expect(configureSync).toHaveBeenCalledWith(expect.objectContaining({ reset: true }));
		expect(debug).toHaveBeenCalledOnce();
	});
});
