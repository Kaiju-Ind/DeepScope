// DeepScope's own test: IndexedDB-only queue behavior beyond the shared suite; not vendored.
import 'fake-indexeddb/auto';
import { expect } from '@std/expect';
import { describe, it } from 'node:test';

import * as context from '@utils/context';

import { open } from '../indexeddb.ts';
import { indexeddb } from './indexeddb.ts';

let databases = 0;
const name = () => `queue-idb-${++databases}`;

describe('indexeddb queue', () => {
	it('keeps items, claims and labels when the handle is reopened', async () => {
		const database = name();
		const clock = new context.TestClock();
		await using ctx = context.create({ id: 'reopen', clock });
		const first = indexeddb<{ url: string }, number>({ database, namespace: 'analysis', clock });
		const ref = await first.add(ctx, { url: 'https://example.com' }, { key: 'tab-1', labels: { tab: 1 } });
		const [claim] = await first.claim(ctx, { owner: 'service-worker-1', duration: 'PT1M' });
		await first.close();

		await using second = indexeddb<{ url: string }, number>({ database, namespace: 'analysis', clock });
		expect(await second.stats()).toMatchObject({ claimed: 1 });
		expect((await second.add(ctx, { url: 'other' }, { key: 'tab-1' })).id).toBe(ref.id);
		// A restarted service worker releases the old owner's leases at once.
		expect(await second.abandon(ctx, { exceptOwner: 'service-worker-2' })).toBe(1);
		await expect(second.complete(ctx, claim!, 1)).rejects.toThrow('no longer owns');
		const [again] = await second.claim(ctx, { owner: 'service-worker-2' });
		expect(again).toMatchObject({ value: { url: 'https://example.com' }, attempt: 2 });
		expect(await second.cancelWhere(ctx, { tab: 1 })).toBe(1);
	});

	it('keeps namespaces apart in one database', async () => {
		const db = await open(name());
		const clock = new context.TestClock();
		await using ctx = context.create({ id: 'namespaces', clock });
		await using analysis = indexeddb<string, string>({ database: db, namespace: 'analysis', clock });
		await using matcher = indexeddb<string, string>({ database: db, namespace: 'matcher', clock });
		await analysis.add(ctx, 'a', { key: 'same', labels: { tab: 1 } });
		await matcher.add(ctx, 'm', { key: 'same', labels: { tab: 1 } });
		expect(await matcher.cancelWhere(ctx, { tab: 1 })).toBe(1);
		expect((await analysis.claim(ctx, { owner: 'w' })).map((claim) => claim.value)).toEqual(['a']);
		expect(await analysis.inspect({ limit: 10, maximumScanned: 10 })).toMatchObject({ scanned: 1 });
		db.close();
	});

	it('wakes a waiting claim on another handle through BroadcastChannel', async () => {
		const database = name();
		await using ctx = context.create({ id: 'broadcast' });
		// A long poll proves the wake came from the other handle's message, not from polling.
		await using waiting = indexeddb<string, string>({ database, poll: { minutes: 1 } });
		await using adding = indexeddb<string, string>({ database });
		await waiting.stats();
		const claim = waiting.claim(ctx, { owner: 'offscreen', wait: true });
		await new Promise((resolve) => setTimeout(resolve, 20));
		await adding.add(ctx, 'from the service worker');
		const started = Date.now();
		expect((await claim).map((c) => c.value)).toEqual(['from the service worker']);
		expect(Date.now() - started).toBeLessThan(5_000);
	});

	it('rolls back an admission whose input cannot be stored', async () => {
		const clock = new context.TestClock();
		await using ctx = context.create({ id: 'clone', clock });
		await using jobs = indexeddb<unknown, string>({ database: name(), clock });
		await expect(jobs.add(ctx, () => {})).rejects.toThrow();
		expect(await jobs.stats()).toMatchObject({ queued: 0 });
		expect(await jobs.inspect({ limit: 10, maximumScanned: 10 })).toMatchObject({ entries: [] });
	});
});
