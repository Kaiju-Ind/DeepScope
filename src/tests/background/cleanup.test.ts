/**
 * Characterisation of background runtime tab cleanup and snapshot-first badge
 * restore. The runtime split (source-layout plan, step 4) moves this code into
 * separate modules; these tests pin the order those modules must keep.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { makeAnalysis, makeDetection, makeDetectionSessionSnapshot } from '../support/factories';
import * as harness from '../support/runtime';

afterEach(() => harness.unload());

describe('background runtime tab cleanup order', { concurrent: false }, () => {
	it.each([
		['navigation', 'onTabNavigation'],
		['tab-closed', 'onTabRemoved'],
	] as const)('aborts document work, then cancels the tab, then the matcher job on %s', async (reason, method) => {
		const { runtime, mocks, signals, release } = await harness.load({ holdMatcher: true });
		await expect(runtime.api.analyzeVisibleTab({ target: harness.TARGET, mode: 'refresh', observe: 'none' }))
			.resolves.toMatchObject({ ok: true });
		await vi.waitFor(() => expect(mocks.runJob).toHaveBeenCalledOnce());
		const work = signals.at(-1)!;
		expect(work.aborted).toBe(false);
		const abortedAtCancelTab: boolean[] = [];
		mocks.cancelTab.mockImplementation(async () => {
			abortedAtCancelTab.push(work.aborted);
		});
		const cancelTabCalls = mocks.cancelTab.mock.calls.length;

		runtime[method](harness.TAB.id);

		// Cleanup runs synchronously inside the listener.
		expect(work.aborted).toBe(true);
		expect(mocks.cancelTab.mock.calls.slice(cancelTabCalls)).toEqual([[harness.TAB.id, reason]]);
		expect(abortedAtCancelTab).toEqual([true]);
		const [jobId] = mocks.cancelJob.mock.calls.at(-1)!;
		expect(jobId).toBe(mocks.runJob.mock.calls[0]![0].job.jobId);
		expect(mocks.cancelTab.mock.invocationCallOrder.at(-1)!).toBeLessThan(mocks.cancelJob.mock.invocationCallOrder.at(-1)!);
		await vi.waitFor(() => expect(mocks.updateMatcherJob).toHaveBeenCalledWith(
			expect.objectContaining({ jobId }),
			{ status: 'canceled', reason },
		));
		release();
	});

	it('cleans the same state for navigation and tab close, differing only in the reason', async () => {
		const run = async (method: 'onTabNavigation' | 'onTabRemoved') => {
			const { runtime, mocks, release } = await harness.load({ holdMatcher: true });
			await runtime.api.analyzeVisibleTab({ target: harness.TARGET, mode: 'refresh', observe: 'none' });
			await vi.waitFor(() => expect(mocks.runJob).toHaveBeenCalledOnce());
			const before = {
				cancelTab: mocks.cancelTab.mock.calls.length,
				cancelJob: mocks.cancelJob.mock.calls.length,
				updates: mocks.updateMatcherJob.mock.calls.length,
			};
			runtime[method](harness.TAB.id);
			await vi.waitFor(() => expect(mocks.updateMatcherJob.mock.calls.length).toBeGreaterThan(before.updates));
			const cleanup = {
				cancelTab: mocks.cancelTab.mock.calls.slice(before.cancelTab).map(([tabId]) => tabId),
				cancelJob: mocks.cancelJob.mock.calls.slice(before.cancelJob).length,
				updates: mocks.updateMatcherJob.mock.calls.slice(before.updates).map(([, patch]) => patch.status),
			};
			release();
			harness.unload();
			return cleanup;
		};
		const navigation = await run('onTabNavigation');
		expect(navigation).toEqual({ cancelTab: [harness.TAB.id], cancelJob: 1, updates: ['canceled'] });
		expect(await run('onTabRemoved')).toEqual(navigation);
	});
});

describe('snapshot-first badge restore', { concurrent: false }, () => {
	const analysis = makeAnalysis([makeDetection('react'), makeDetection('vite')], { url: harness.TAB.url, source: 'cache' });

	it('restores the badge from a stored result for the exact URL', async () => {
		const stored = makeDetectionSessionSnapshot({ analysis, urlHash: harness.TARGET.urlHash, status: 'complete' });
		const { runtime, mocks } = await harness.load({ stored });
		await expect(runtime.api.analyzeVisibleTab({ target: harness.TARGET, mode: 'snapshot-first', observe: 'none' }))
			.resolves.toMatchObject({ ok: true, value: { snapshot: { status: 'hit' } } });

		expect(mocks.setBadge).toHaveBeenCalledWith(harness.TAB.id, 2, expect.anything());
		expect(mocks.collect).not.toHaveBeenCalled();
	});

	it('does not restore the badge from a same-site snapshot of another page', async () => {
		const stored = makeDetectionSessionSnapshot({ analysis, urlHash: 'another-page', status: 'complete' });
		const { runtime, mocks } = await harness.load({ stored });
		await runtime.api.analyzeVisibleTab({ target: harness.TARGET, mode: 'snapshot-first', observe: 'none' });

		expect(mocks.setBadge).not.toHaveBeenCalledWith(harness.TAB.id, 2, expect.anything());
	});
});
