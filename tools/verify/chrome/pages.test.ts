import { afterEach, describe, expect, it, vi } from 'vitest';

/** Only the process adapter is replaced; the production report owner runs unchanged. */
const mocks = vi.hoisted(() => ({ launch: vi.fn() }));
vi.mock('./process.mjs', async (original) => ({
	...await original<typeof import('./process.mjs')>(),
	launch: mocks.launch,
}));
import { validate } from './pages.mjs';
import { StartupError } from './process.mjs';

afterEach(() => vi.resetAllMocks());

describe('Chrome page report ownership', () => {
	it('retains a successful startup check when process cleanup rejects', async () => {
		const close = vi.fn(async () => { throw new Error('profile removal failed'); });
		mocks.launch.mockResolvedValue({
			version: { webSocketDebuggerUrl: 'ws://fixture' },
			diagnostics: () => ({ exitCode: 0, stderr: '' }),
			close,
		});
		const results = await validate({ artifactDirectory: '/fixture', chrome: '/browser', manifest: {} });
		expect(results).toMatchObject([
			{ name: 'Chrome DevTools endpoint started', pass: true },
			{ name: 'Chrome process and profile cleanup', pass: false, evidence: { error: 'profile removal failed' } },
		]);
		expect(close).toHaveBeenCalledOnce();
	});

	it('reports target and cleanup failures independently', async () => {
		mocks.launch.mockResolvedValue({
			version: { webSocketDebuggerUrl: 'ws://fixture' },
			request: async () => { throw new Error('target request failed'); },
			diagnostics: () => ({ signal: 'SIGTERM', stderr: 'stopping' }),
			close: async () => { throw new Error('process did not close'); },
		});
		const results = await validate({
			artifactDirectory: '/fixture', chrome: '/browser', manifest: { options_page: 'options.html' },
		});
		expect(results).toMatchObject([
			{ name: 'Chrome DevTools endpoint started', pass: true },
			{ name: 'generated extension pages start in Chrome', pass: false, evidence: { error: 'target request failed' } },
			{ name: 'Chrome process and profile cleanup', pass: false, evidence: { error: 'process did not close' } },
		]);
	});

	it('keeps final process evidence from a launch that cleaned up before rejecting', async () => {
		mocks.launch.mockRejectedValue(new StartupError(new Error('browser exited'), { exitCode: 7, stderr: 'launch rejected' }));
		await expect(validate({ artifactDirectory: '/fixture', chrome: '/browser', manifest: {} })).resolves.toMatchObject([
			{ pass: false, evidence: { error: 'Chrome startup failed: browser exited', process: { exitCode: 7, stderr: 'launch rejected' } } },
		]);
	});
});
