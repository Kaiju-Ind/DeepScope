/**
 * An automatic scan must never wait forever on the analysis lane.
 *
 * Found by the Firefox stress run: a tab logged `auto-scan-start` with no
 * `analysis-requested` after it, then every later scan for the tab reported
 * `auto-scan-already-in-flight`. These tests cover the two ways the lane could
 * keep a caller waiting: work admitted while the lane was deciding to stop, and
 * one execution that never settles.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { AnalyzeVisibleTabInput } from '@/lib/messaging/analysis';
import { LANE_TIMEOUT_MS } from '@/lib/scheduler/lane';
import { EXECUTION_SCHEMA_VERSION, type AnalysisWorkType } from '@/lib/scheduler/schema';
import { settle } from '../support/settle';

function input(tabId: number): AnalyzeVisibleTabInput {
	return {
		target: {
			windowId: 1,
			tabId,
			frameId: 0,
			url: `https://example.com/${tabId}`,
			hostname: 'example.com',
			originHash: 'origin',
			urlHash: `url-${tabId}`,
			incognito: false,
		},
		mode: 'refresh',
		observe: 'none',
	};
}

/** An in-memory work store whose `claim` can be held open after it read the store. */
function mockDatabase() {
	const records = new Map<string, AnalysisWorkType>();
	let held: { readonly release: () => void } | undefined;
	let holdNextClaim = false;
	let tokens = 0;
	const database = {
		admitAnalysis: vi.fn(async (work: AnalysisWorkType) => {
			records.set(work.id, work);
			return { accepted: true as const, created: true, work };
		}),
		claim: vi.fn(async (query: { minPriorityRank?: number; maxPriorityRank?: number }) => {
			// Read first, like an IndexedDB cursor: a record committed after this
			// point is not part of this claim's answer.
			const found = [...records.values()].find((work) => work.state === 'queued'
				&& work.priorityRank >= (query.minPriorityRank ?? 0)
				&& work.priorityRank <= (query.maxPriorityRank ?? 3));
			if (holdNextClaim) {
				holdNextClaim = false;
				const gate = Promise.withResolvers<void>();
				held = { release: gate.resolve };
				await gate.promise;
			}
			if (!found) return undefined;
			const claimed = { ...found, schemaVersion: EXECUTION_SCHEMA_VERSION, state: 'claimed' as const, attempt: 1, claimOwner: 'owner', claimToken: `claim-${++tokens}` };
			records.set(found.id, claimed);
			return claimed;
		}),
		recoverClaims: vi.fn(async () => []),
		remove: vi.fn(async (id: string) => void records.delete(id)),
		removeClaim: vi.fn(async (id: string, token: string) => {
			if (records.get(id)?.claimToken !== token) return false;
			records.delete(id);
			return true;
		}),
		removeOtherSessions: vi.fn(async () => 0),
		removeTabKind: vi.fn(async () => []),
		reprioritizeWindow: vi.fn(async () => 0),
		setPriority: vi.fn(async () => true),
	};
	return {
		database,
		records,
		holdNextClaim: () => { holdNextClaim = true; },
		releaseHeldClaim: () => held?.release(),
	};
}

afterEach(() => {
	vi.doUnmock('@/lib/scheduler/database');
	vi.doUnmock('@/lib/scheduler/session');
	vi.useRealTimers();
	vi.resetModules();
});

async function createScheduler(store: ReturnType<typeof mockDatabase>, analyze: (input: AnalyzeVisibleTabInput) => Promise<unknown>) {
	vi.doMock('@/lib/scheduler/database', () => store.database);
	vi.doMock('@/lib/scheduler/session', () => ({
		createId: vi.fn(() => 'owner'),
		get: vi.fn(async () => 'browser-session'),
	}));
	const analysis = await import('@/lib/scheduler/analysis');
	return { analysis, scheduler: analysis.create({
		resolveTarget: vi.fn(async (work: AnalysisWorkType) => ({ ok: true as const, value: input(work.tabId).target })),
		analyze: analyze as never,
	}) };
}

describe('analysis lane liveness', { concurrent: false }, () => {
	it('runs work admitted while the lane was finding nothing left to claim', async () => {
		const store = mockDatabase();
		const analyze = vi.fn(async () => ({ ok: false as const, failure: { code: 'VALIDATION_ERROR' as const, message: 'fixture' } }));
		const { scheduler } = await createScheduler(store, analyze);

		// The lane starts (the tab's own activation) and reads an empty store...
		store.holdNextClaim();
		await scheduler.activateTab(7, 1);
		await vi.waitFor(() => expect(store.database.claim).toHaveBeenCalledTimes(1));

		// ...while an automatic scan commits its work and asks the lane to drain.
		let settled = false;
		const scan = scheduler.analyze(input(7), 'automatic').finally(() => {
			settled = true;
		});
		await vi.waitFor(() => expect(store.records.size).toBe(1));
		await settle();

		// The lane's empty answer arrives after the admission.
		store.releaseHeldClaim();
		await settle();
		await settle();

		expect(analyze).toHaveBeenCalledTimes(1);
		expect(settled).toBe(true);
		await expect(scan).resolves.toMatchObject({ ok: false });
	});

	it('settles a caller whose execution never finishes and keeps the lane moving', async () => {
		vi.useFakeTimers();
		const store = mockDatabase();
		const analyze = vi.fn((request: AnalyzeVisibleTabInput) => request.target.tabId === 7
			? new Promise<never>(() => undefined)
			: Promise.resolve({ ok: false as const, failure: { code: 'VALIDATION_ERROR' as const, message: 'second' } }));
		const { scheduler } = await createScheduler(store, analyze);

		const stuck = scheduler.analyze(input(7), 'automatic');
		const next = scheduler.analyze(input(8), 'automatic');
		await vi.advanceTimersByTimeAsync(0);
		expect(analyze).toHaveBeenCalledTimes(1);

		await vi.advanceTimersByTimeAsync(LANE_TIMEOUT_MS);

		await expect(stuck).resolves.toMatchObject({ ok: false, failure: { code: 'ANALYSIS_TIMEOUT' } });
		await expect(next).resolves.toMatchObject({ ok: false, failure: { message: 'second' } });
		expect(store.records.size).toBe(0);
	});
});
