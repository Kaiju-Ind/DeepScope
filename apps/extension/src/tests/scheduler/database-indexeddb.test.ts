import 'fake-indexeddb/auto';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import * as database from '@/lib/scheduler/database';
import * as priority from '@/lib/scheduler/priority';
import { EXECUTION_SCHEMA_VERSION, type AnalysisWorkType, type WorkPriorityType } from '@/lib/scheduler/schema';

/**
 * These tests run the real `idb` transactions against fake-indexeddb, an
 * in-memory implementation of the IndexedDB specification. They cover what
 * mocked database calls cannot: compound-index ordering, the admission count
 * inside one transaction, and claim recovery across owners.
 */
const SESSION = 'browser-session-1';

function analysis(id: string, workPriority: WorkPriorityType, createdAt: number): AnalysisWorkType {
	return {
		schemaVersion: EXECUTION_SCHEMA_VERSION,
		id,
		kind: 'analysis',
		browserSessionId: SESSION,
		windowId: 1,
		tabId: Number(id.replace(/\D/g, '')) || 1,
		priority: workPriority,
		priorityRank: priority.rank(workPriority),
		state: 'queued',
		createdAt,
		updatedAt: createdAt,
		attempt: 0,
		frameId: 0,
		originHash: 'origin',
		urlHash: `url-${id}`,
		mode: 'refresh',
		observe: 'none',
		source: 'automatic',
	};
}

beforeEach(async () => {
	// Each test starts from an empty database; the module caches one connection.
	await database.close();
	await new Promise<void>((resolve, reject) => {
		const request = indexedDB.deleteDatabase('kaiju-deepscope-execution');
		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
});

afterEach(async () => {
	await database.close();
});

describe('execution database on IndexedDB', { concurrent: false }, () => {
	it('claims by priority rank, then by age, and never claims the same record twice', async () => {
		await database.save(analysis('background-old', 'background', 1));
		await database.save(analysis('foreground-new', 'foreground', 3));
		await database.save(analysis('foreground-old', 'foreground', 2));
		await database.save(analysis('interactive', 'interactive', 4));

		const order: string[] = [];
		for (;;) {
			const claimed = await database.claim({ browserSessionId: SESSION, kind: 'analysis', owner: 'owner-a' });
			if (!claimed) break;
			expect(claimed).toMatchObject({ state: 'claimed', claimOwner: 'owner-a', attempt: 1 });
			order.push(claimed.id);
		}
		expect(order).toEqual(['interactive', 'foreground-old', 'foreground-new', 'background-old']);
	});

	it('limits a claim to a priority range for the fairness turn', async () => {
		await database.save(analysis('foreground', 'foreground', 1));
		await database.save(analysis('background', 'background', 2));

		const lower = await database.claim({ browserSessionId: SESSION, kind: 'analysis', owner: 'owner-a', minPriorityRank: 2, maxPriorityRank: 3 });
		expect(lower?.id).toBe('background');
	});

	it('enforces the admission limit and joins equivalent work instead of duplicating it', async () => {
		const first = await database.admitAnalysis(analysis('job1', 'background', 1), 2);
		const second = await database.admitAnalysis(analysis('job2', 'background', 2), 2);
		const overflow = await database.admitAnalysis(analysis('job3', 'background', 3), 2);
		const joined = await database.admitAnalysis({ ...analysis('job1', 'interactive', 4), source: 'interactive' }, 2);

		expect(first).toMatchObject({ accepted: true, created: true });
		expect(second).toMatchObject({ accepted: true, created: true });
		expect(overflow).toEqual({ accepted: false });
		// Joining promotes the existing record without counting against the limit.
		expect(joined).toMatchObject({ accepted: true, created: false, work: { id: 'job1', priority: 'interactive', source: 'interactive' } });
		expect((await database.listKind(SESSION, 'analysis')).map((work) => work.id).sort()).toEqual(['job1', 'job2']);
	});

	it('requeues only claims held by a previous owner during recovery', async () => {
		await database.save(analysis('job1', 'foreground', 1));
		await database.save(analysis('job2', 'foreground', 2));
		const stale = await database.claim({ browserSessionId: SESSION, kind: 'analysis', owner: 'old-context' });
		const current = await database.claim({ browserSessionId: SESSION, kind: 'analysis', owner: 'new-context' });

		const recovered = await database.recoverClaims(SESSION, 'new-context', 'analysis');

		expect(recovered.map((work) => work.id)).toEqual([stale!.id]);
		const records = new Map((await database.listKind(SESSION, 'analysis')).map((work) => [work.id, work]));
		expect(records.get(stale!.id)).toMatchObject({ state: 'queued' });
		expect(records.get(stale!.id)).not.toHaveProperty('claimToken');
		expect(records.get(current!.id)).toMatchObject({ state: 'claimed', claimOwner: 'new-context' });
		// A stale token can no longer remove the requeued record.
		expect(await database.removeClaim(stale!.id, stale!.claimToken!)).toBe(false);
		expect(await database.removeClaim(current!.id, current!.claimToken!)).toBe(true);
	});
});
