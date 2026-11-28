import { afterEach, describe, expect, it, vi } from 'vitest';

import type { AnalyzeVisibleTabInput } from "../../lib/messaging/analysis.ts";
import { EXECUTION_SCHEMA_VERSION, type AnalysisWorkType } from "../../lib/scheduler/schema.ts";
import { settle } from "../support/settle.ts";

function input(): AnalyzeVisibleTabInput {
	return {
		target: {
			windowId: 1,
			tabId: 7,
			frameId: 0,
			url: 'https://example.com/',
			hostname: 'example.com',
			originHash: 'origin',
			urlHash: 'url',
			incognito: false,
		},
		mode: 'refresh',
		observe: 'none',
	};
}

afterEach(() => {
	vi.doUnmock('../../lib/scheduler/database.ts');
	vi.doUnmock('../../lib/scheduler/session.ts');
	vi.resetModules();
});

describe('analysis canceled while its claim is being removed', { concurrent: false }, () => {
	// Found by the Firefox stress run (tools/verify/stress/index.mjs): a tab that
	// navigated exactly as its scan finished never scanned again, because the
	// automatic-scan controller waits on this completion before it starts the
	// next scan for the tab.
	it('settles the caller when the execution removed its own record after the tab changed', async () => {
		let durable: AnalysisWorkType | undefined;
		const { promise: removeClaimGate, resolve: openRemoveClaim } = Promise.withResolvers<void>();
		const { promise: claimRemoved, resolve: markClaimRemoved } = Promise.withResolvers<void>();
		vi.doMock('../../lib/scheduler/database.ts', () => ({
			admitAnalysis: vi.fn(async (work: AnalysisWorkType) => {
				durable = work;
				return { accepted: true as const, created: true, work };
			}),
			claim: vi.fn(async () => {
				if (!durable || durable.state !== 'queued') return undefined;
				durable = { ...durable, schemaVersion: EXECUTION_SCHEMA_VERSION, state: 'claimed', attempt: 1, claimOwner: 'owner', claimToken: 'claim-1' };
				return durable;
			}),
			recoverClaims: vi.fn(async () => []),
			remove: vi.fn(async () => undefined),
			// The execution's own cleanup commits first...
			removeClaim: vi.fn(async (id: string, token: string) => {
				await removeClaimGate;
				const owned = durable?.id === id && durable.claimToken === token;
				if (owned) durable = undefined;
				markClaimRemoved();
				return owned;
			}),
			removeOtherSessions: vi.fn(async () => 0),
			// ...so the tab cleanup that follows finds nothing to cancel.
			removeTabKind: vi.fn(async (_sessionId: string, tabId: number) => {
				await claimRemoved;
				if (!durable || durable.tabId !== tabId) return [];
				const removed = [durable];
				durable = undefined;
				return removed;
			}),
			reprioritizeWindow: vi.fn(async () => 0),
			setPriority: vi.fn(async () => true),
		}));
		vi.doMock('../../lib/scheduler/session.ts', () => ({
			createId: vi.fn(() => 'owner'),
			get: vi.fn(async () => 'browser-session'),
		}));

		const analysis = await import('../../lib/scheduler/analysis.ts');
		const analyze = vi.fn(async () => ({ ok: false as const, failure: { code: 'VALIDATION_ERROR' as const, message: 'old document' } }));
		const scheduler = analysis.create({
			resolveTarget: vi.fn(async () => ({ ok: true as const, value: input().target })),
			analyze,
		});

		let settled = false;
		const first = scheduler.analyze(input(), 'automatic').finally(() => {
			settled = true;
		});
		await vi.waitFor(() => expect(analyze).toHaveBeenCalledTimes(1));

		// The tab navigates while the finished execution is removing its claim.
		const cancel = scheduler.cancelTab(7);
		openRemoveClaim();
		await cancel;
		await settle();

		expect(settled).toBe(true);
		await expect(first).resolves.toMatchObject({ ok: false });
	});
});
