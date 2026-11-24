/**
 * Queue conformance suite: one set of behavior tests every queue store must pass.
 *
 * `conformance(name, create)` registers the cases with `node:test`, so a store
 * runs it from its own test file under Deno, Node, Bun or (through DeepScope's
 * shim) Vitest. The cases cover the core {@link Queue} contract: admission and
 * idempotent keys, priority/FIFO claim order, delayed availability, fenced
 * completion after expiry, renewal, retry, failure, cancellation, capacity,
 * waiting, retention and pruning, inspection, redrive and closing. Extension
 * cases (labels, `cancelWhere`, `reprioritize`, `abandon`) run only when the
 * store provides the method. When the subject offers `peer()`, a second handle
 * on the same storage, the suite also checks that handles in different
 * contexts never lease one item twice.
 *
 * DeepScope's own file, proposed for upstream; not vendored.
 *
 * @example
 * ```ts
 * import * as context from '@utils/context';
 * import * as queue from '@utils/scheduler/queue';
 * import { conformance } from '@utils/scheduler/queue/testing';
 * conformance('memory', ({ clock, capacity, retention }) => ({ queue: queue.memory({ clock, capacity, retention }) }));
 * ```
 *
 * @module
 */
import { expect } from '@std/expect';
import { describe, it } from 'node:test';

import * as context from '@utils/context';
import {
	QueueCapacityError,
	QueueClosedError,
	QueueItemCancelledError,
	QueueItemFailedError,
	QueueItemNotFoundError,
	StaleClaimError,
} from './mod.ts';
import type { LabeledQueue } from './extensions.ts';
import type { QueueRetentionOptions } from './types.ts';

/** Inputs every case passes to the store factory. */
export interface QueueFactoryOptions {
	/** Deterministic clock; the store must read time only from it. */
	readonly clock: context.TestClock;
	/** Active-item capacity, when a case tests it. */
	readonly capacity?: number;
	/** Terminal retention, when a case tests pruning. */
	readonly retention?: QueueRetentionOptions;
}

/** One store under test. */
export interface QueueSubject {
	/** The queue handle the cases drive. */
	readonly queue: LabeledQueue<string, string>;
	/** Open another handle on the same storage, as another browser context would. */
	readonly peer?: () => Promise<LabeledQueue<string, string>>;
	/** Release storage after the case, after the queue handles are closed. */
	readonly cleanup?: () => Promise<void>;
}

type Factory = (options: QueueFactoryOptions) => QueueSubject | Promise<QueueSubject>;

const failure = Object.freeze({ id: 'failure-1', name: 'Error', message: 'boom' }) as never;

/** Register the conformance cases for one store. */
export function conformance(name: string, create: Factory): void {
	async function open(options: Partial<QueueFactoryOptions> = {}) {
		const clock = options.clock ?? new context.TestClock();
		const subject = await create({ ...options, clock });
		const ctx = context.create({ id: `conformance-${name}`, clock });
		const peers: LabeledQueue<string, string>[] = [];
		return {
			clock,
			ctx,
			jobs: subject.queue,
			subject,
			async peer() {
				const handle = await subject.peer!();
				peers.push(handle);
				return handle;
			},
			async [Symbol.asyncDispose]() {
				for (const handle of peers) await handle.close();
				await subject.queue.close();
				await ctx[Symbol.asyncDispose]();
				await subject.cleanup?.();
			},
		};
	}

	describe(`queue conformance: ${name}`, () => {
		it('adds, claims, completes and returns the result', async () => {
			await using t = await open();
			const ref = await t.jobs.add(t.ctx, 'resize');
			const [claim] = await t.jobs.claim(t.ctx, { owner: 'worker-a', duration: 'PT30S' });
			expect(claim).toMatchObject({ itemId: ref.id, owner: 'worker-a', value: 'resize', attempt: 1 });
			expect(claim!.expiresAt.epochMilliseconds - claim!.claimedAt.epochMilliseconds).toBe(30_000);
			await t.jobs.complete(t.ctx, claim!, 'RESIZE');
			expect(await t.jobs.result(t.ctx, ref)).toBe('RESIZE');
			expect(await t.jobs.stats()).toMatchObject({ queued: 0, claimed: 0, completed: 1 });
		});

		it('returns the original reference for a repeated key', async () => {
			await using t = await open();
			const first = await t.jobs.add(t.ctx, 'one', { key: 'job-1' });
			const second = await t.jobs.add(t.ctx, 'two', { key: 'job-1' });
			expect(second.id).toBe(first.id);
			expect((await t.jobs.stats()).queued).toBe(1);
		});

		it('claims by descending priority, then admission order', async () => {
			await using t = await open();
			await t.jobs.add(t.ctx, 'low-1');
			await t.jobs.add(t.ctx, 'high', { priority: 5 });
			await t.jobs.add(t.ctx, 'low-2');
			const claims = await t.jobs.claim(t.ctx, { owner: 'w', limit: 10 });
			expect(claims.map((claim) => claim.value)).toEqual(['high', 'low-1', 'low-2']);
		});

		it('hides delayed items until the clock reaches them', async () => {
			await using t = await open();
			await t.jobs.add(t.ctx, 'later', { priority: 9, availableAt: t.clock.now().add({ seconds: 10 }) });
			await t.jobs.add(t.ctx, 'now');
			expect((await t.jobs.claim(t.ctx, { owner: 'w', limit: 10 })).map((claim) => claim.value)).toEqual(['now']);
			t.clock.advance({ seconds: 10 });
			expect((await t.jobs.claim(t.ctx, { owner: 'w' })).map((claim) => claim.value)).toEqual(['later']);
		});

		it('claims one exact item by reference', async () => {
			await using t = await open();
			await t.jobs.add(t.ctx, 'first');
			const ref = await t.jobs.add(t.ctx, 'second');
			const [claim] = await t.jobs.claim(t.ctx, { owner: 'w', ref });
			expect(claim?.value).toBe('second');
			expect(await t.jobs.claim(t.ctx, { owner: 'w', ref })).toEqual([]);
			await expect(t.jobs.claim(t.ctx, { owner: 'w', ref, limit: 2 })).rejects.toThrow(TypeError);
			await expect(t.jobs.claim(t.ctx, { owner: 'w', ref: { id: 'missing' } })).rejects.toThrow(QueueItemNotFoundError);
		});

		it('fences an expired claim and offers the item again as the next attempt', async () => {
			await using t = await open();
			const ref = await t.jobs.add(t.ctx, 'work');
			const [first] = await t.jobs.claim(t.ctx, { owner: 'a', duration: 'PT1S' });
			t.clock.advance({ seconds: 1 });
			const [second] = await t.jobs.claim(t.ctx, { owner: 'b', duration: 'PT1S' });
			expect(second).toMatchObject({ itemId: ref.id, owner: 'b', attempt: 2 });
			await expect(t.jobs.complete(t.ctx, first!, 'late')).rejects.toThrow(StaleClaimError);
			await expect(t.jobs.renew(t.ctx, first!, 'PT1S')).rejects.toThrow(StaleClaimError);
			await expect(t.jobs.fail(t.ctx, first!, failure)).rejects.toThrow(StaleClaimError);
			await expect(t.jobs.retry(t.ctx, first!)).rejects.toThrow(StaleClaimError);
			await expect(t.jobs.cancel(t.ctx, first!)).rejects.toThrow(StaleClaimError);
			await t.jobs.complete(t.ctx, second!, 'done');
			await expect(t.jobs.complete(t.ctx, second!, 'twice')).rejects.toThrow(StaleClaimError);
			expect(await t.jobs.result(t.ctx, ref)).toBe('done');
		});

		it('rejects a claim whose owner does not match', async () => {
			await using t = await open();
			await t.jobs.add(t.ctx, 'work');
			const [claim] = await t.jobs.claim(t.ctx, { owner: 'a' });
			await expect(t.jobs.complete(t.ctx, { ...claim!, owner: 'b' }, 'x')).rejects.toThrow(StaleClaimError);
			await expect(t.jobs.complete(t.ctx, { ...claim!, id: 'forged' }, 'x')).rejects.toThrow(StaleClaimError);
		});

		it('renews a live claim past its first expiry', async () => {
			await using t = await open();
			const ref = await t.jobs.add(t.ctx, 'work');
			const [claim] = await t.jobs.claim(t.ctx, { owner: 'a', duration: 'PT1S' });
			const renewed = await t.jobs.renew(t.ctx, claim!, 'PT10S');
			expect(renewed.id).toBe(claim!.id);
			expect(renewed.expiresAt.epochMilliseconds).toBe(t.clock.now().epochMilliseconds + 10_000);
			t.clock.advance({ seconds: 5 });
			expect(await t.jobs.claim(t.ctx, { owner: 'b' })).toEqual([]);
			await t.jobs.complete(t.ctx, renewed, 'ok');
			expect(await t.jobs.result(t.ctx, ref)).toBe('ok');
		});

		it('retries with a delay and a new priority', async () => {
			await using t = await open();
			await t.jobs.add(t.ctx, 'retried');
			await t.jobs.add(t.ctx, 'other', { priority: 1 });
			const [other] = await t.jobs.claim(t.ctx, { owner: 'a' });
			const [claim] = await t.jobs.claim(t.ctx, { owner: 'a' });
			expect(claim?.value).toBe('retried');
			await t.jobs.retry(t.ctx, claim!, { delay: 'PT5S', priority: 7 });
			await t.jobs.retry(t.ctx, other!);
			expect((await t.jobs.claim(t.ctx, { owner: 'a', limit: 5 })).map((c) => c.value)).toEqual(['other']);
			t.clock.advance({ seconds: 5 });
			const [again] = await t.jobs.claim(t.ctx, { owner: 'a' });
			expect(again).toMatchObject({ value: 'retried', attempt: 2 });
			await expect(t.jobs.retry(t.ctx, again!, { delay: 'PT1S', availableAt: t.clock.now() })).rejects.toThrow(TypeError);
		});

		it('reports failure and cancellation through result()', async () => {
			await using t = await open();
			const failed = await t.jobs.add(t.ctx, 'fails');
			const cancelled = await t.jobs.add(t.ctx, 'cancelled');
			const [claim] = await t.jobs.claim(t.ctx, { owner: 'a', ref: failed });
			await t.jobs.fail(t.ctx, claim!, failure);
			await t.jobs.cancel(t.ctx, cancelled, 'not needed');
			await t.jobs.cancel(t.ctx, cancelled);
			await expect(t.jobs.result(t.ctx, failed)).rejects.toThrow(QueueItemFailedError);
			await expect(t.jobs.result(t.ctx, cancelled)).rejects.toThrow(QueueItemCancelledError);
			expect(await t.jobs.stats()).toMatchObject({ failed: 1, cancelled: 1, queued: 0 });
		});

		it('cancels a claimed item by reference and makes its claim stale', async () => {
			await using t = await open();
			const ref = await t.jobs.add(t.ctx, 'work');
			const [claim] = await t.jobs.claim(t.ctx, { owner: 'a' });
			await t.jobs.cancel(t.ctx, ref);
			await expect(t.jobs.complete(t.ctx, claim!, 'late')).rejects.toThrow(StaleClaimError);
		});

		it('rejects admission beyond active capacity and frees it on completion', async () => {
			await using t = await open({ capacity: 2 });
			await t.jobs.add(t.ctx, 'a');
			await t.jobs.add(t.ctx, 'b', { availableAt: t.clock.now().add({ hours: 1 }) });
			await expect(t.jobs.add(t.ctx, 'c')).rejects.toThrow(QueueCapacityError);
			const [claim] = await t.jobs.claim(t.ctx, { owner: 'w' });
			await expect(t.jobs.add(t.ctx, 'c')).rejects.toThrow(QueueCapacityError);
			await t.jobs.complete(t.ctx, claim!, 'A');
			await t.jobs.add(t.ctx, 'c');
		});

		it('wakes a waiting claim when work arrives and when a delay passes', async () => {
			await using t = await open();
			const waiting = t.jobs.claim(t.ctx, { owner: 'w', wait: true });
			await new Promise((resolve) => setTimeout(resolve, 5));
			await t.jobs.add(t.ctx, 'arrived');
			expect((await waiting).map((claim) => claim.value)).toEqual(['arrived']);
			const ref = await t.jobs.add(t.ctx, 'delayed', { availableAt: t.clock.now().add({ seconds: 3 }) });
			const ready = t.jobs.wait(t.ctx, ref);
			await new Promise((resolve) => setTimeout(resolve, 5));
			t.clock.advance({ seconds: 3 });
			expect(await ready).toBe('claimable');
		});

		it('wakes a result waiter when the item settles', async () => {
			await using t = await open();
			const ref = await t.jobs.add(t.ctx, 'work');
			const result = t.jobs.result(t.ctx, ref);
			const [claim] = await t.jobs.claim(t.ctx, { owner: 'w' });
			await t.jobs.complete(t.ctx, claim!, 'done');
			expect(await result).toBe('done');
			expect(await t.jobs.wait(t.ctx, ref)).toBe('terminal');
		});

		it('stops a waiting claim when its context is cancelled', async () => {
			await using t = await open();
			const controller = new AbortController();
			await using child = context.create({ id: 'waiter', clock: t.clock, signal: controller.signal });
			const waiting = t.jobs.claim(child, { owner: 'w', wait: true });
			controller.abort(new Error('stop'));
			await expect(waiting).rejects.toThrow('stop');
		});

		it('prunes terminal records past retention and frees their keys', async () => {
			await using t = await open({ retention: { limit: 10, duration: { minutes: 1 } } });
			const ref = await t.jobs.add(t.ctx, 'old', { key: 'k' });
			const [claim] = await t.jobs.claim(t.ctx, { owner: 'w' });
			await t.jobs.complete(t.ctx, claim!, 'done');
			expect(await t.jobs.prune()).toEqual({ deleted: 0, more: false });
			t.clock.advance({ minutes: 2 });
			expect((await t.jobs.prune()).deleted).toBe(1);
			const again = await t.jobs.add(t.ctx, 'new', { key: 'k' });
			expect(again.id).not.toBe(ref.id);
		});

		it('keeps at most the retention limit of terminal records', async () => {
			await using t = await open({ retention: { limit: 2, duration: { hours: 1 } } });
			for (const value of ['a', 'b', 'c', 'd']) {
				await t.jobs.add(t.ctx, value);
				const [claim] = await t.jobs.claim(t.ctx, { owner: 'w' });
				await t.jobs.complete(t.ctx, claim!, value);
			}
			await t.jobs.prune();
			expect((await t.jobs.stats()).completed).toBe(2);
		});

		it('inspects metadata in admission order, filtered and paged', async () => {
			await using t = await open();
			const refs = [];
			for (const value of ['a', 'b', 'c', 'd', 'e']) refs.push(await t.jobs.add(t.ctx, value, { priority: value === 'c' ? 3 : 0 }));
			const [claim] = await t.jobs.claim(t.ctx, { owner: 'w' });
			expect(claim?.value).toBe('c');
			const first = await t.jobs.inspect({ limit: 2, maximumScanned: 2 });
			expect(first.entries.map((entry) => entry.id)).toEqual([refs[0]!.id, refs[1]!.id]);
			expect(first.entries[0]).toEqual({ id: refs[0]!.id, state: 'queued', attempt: 0, priority: 0 });
			const rest = await t.jobs.inspect({ limit: 10, maximumScanned: 10, cursor: first.cursor! });
			expect(rest.entries.map((entry) => entry.id)).toEqual(refs.slice(2).map((ref) => ref.id));
			expect(rest.cursor).toBeUndefined();
			const claimed = await t.jobs.inspect({ state: 'claimed', limit: 10, maximumScanned: 10 });
			expect(claimed.entries).toEqual([{ id: refs[2]!.id, state: 'claimed', attempt: 1, priority: 3 }]);
			await expect(t.jobs.inspect({ limit: 10, maximumScanned: 10, cursor: first.cursor!, state: 'queued' })).rejects.toThrow(TypeError);
		});

		it('redrives a failed item as a new item and deduplicates by key', async () => {
			await using t = await open();
			const ref = await t.jobs.add(t.ctx, 'work', { priority: 4 });
			const [claim] = await t.jobs.claim(t.ctx, { owner: 'w' });
			await expect(t.jobs.redrive(t.ctx, ref, { key: 'redrive-1' })).rejects.toThrow(TypeError);
			await t.jobs.fail(t.ctx, claim!, failure);
			const copy = await t.jobs.redrive(t.ctx, ref, { key: 'redrive-1' });
			expect((await t.jobs.redrive(t.ctx, ref, { key: 'redrive-1' })).id).toBe(copy.id);
			expect(copy.id).not.toBe(ref.id);
			const page = await t.jobs.inspect({ state: 'queued', limit: 10, maximumScanned: 10 });
			expect(page.entries).toEqual([{ id: copy.id, state: 'queued', attempt: 0, priority: 4, redrivenFrom: ref.id }]);
			const [again] = await t.jobs.claim(t.ctx, { owner: 'w' });
			expect(again).toMatchObject({ value: 'work', attempt: 1 });
		});

		it('rejects waiters and later operations once closed', async () => {
			await using t = await open();
			const ref = await t.jobs.add(t.ctx, 'work');
			const waiting = t.jobs.result(t.ctx, ref);
			const claim = t.jobs.claim(t.ctx, { owner: 'w', wait: true, ref: await t.jobs.add(t.ctx, 'later', { availableAt: t.clock.now().add({ hours: 1 }) }) });
			await new Promise((resolve) => setTimeout(resolve, 5));
			await t.jobs.close('shutdown');
			await expect(waiting).rejects.toThrow(QueueClosedError);
			await expect(claim).rejects.toThrow(QueueClosedError);
			await expect(t.jobs.add(t.ctx, 'more')).rejects.toThrow(QueueClosedError);
		});

		it('rejects empty keys, owners and invalid durations', async () => {
			await using t = await open();
			await expect(t.jobs.add(t.ctx, 'x', { key: ' ' })).rejects.toThrow(TypeError);
			await t.jobs.add(t.ctx, 'x');
			await expect(t.jobs.claim(t.ctx, { owner: ' ' })).rejects.toThrow(TypeError);
			await expect(t.jobs.claim(t.ctx, { owner: 'w', duration: 'PT0S' })).rejects.toThrow(RangeError);
		});

		it('never leases one item to two concurrent claimers', async () => {
			await using t = await open();
			for (let index = 0; index < 20; index++) await t.jobs.add(t.ctx, `item-${index}`);
			const handles = t.subject.peer ? [t.jobs, await t.peer(), await t.peer()] : [t.jobs];
			const claims = (await Promise.all(Array.from({ length: 30 }, (_, index) =>
				handles[index % handles.length]!.claim(t.ctx, { owner: `w-${index}`, limit: 2 })
			))).flat();
			expect(claims).toHaveLength(20);
			expect(new Set(claims.map((claim) => claim.itemId)).size).toBe(20);
		});

		describe('extensions', () => {
			it('cancels unfinished items by label', async (test) => {
				await using t = await open();
				if (!t.jobs.cancelWhere) return skip(test);
				const tab1 = await t.jobs.add(t.ctx, 'a', { labels: { tab: 1, kind: 'scan' } });
				const tab1Claimed = await t.jobs.add(t.ctx, 'b', { labels: { tab: 1, kind: 'scan' } });
				const tab2 = await t.jobs.add(t.ctx, 'c', { labels: { tab: 2, kind: 'scan' } });
				const stringTab = await t.jobs.add(t.ctx, 'd', { labels: { tab: '1', kind: 'scan' } });
				const [claim] = await t.jobs.claim(t.ctx, { owner: 'w', ref: tab1Claimed });
				const done = await t.jobs.add(t.ctx, 'e', { labels: { tab: 1 } });
				const [doneClaim] = await t.jobs.claim(t.ctx, { owner: 'w', ref: done });
				await t.jobs.complete(t.ctx, doneClaim!, 'E');
				expect(await t.jobs.cancelWhere(t.ctx, { tab: 1 }, 'tab closed')).toBe(2);
				await expect(t.jobs.result(t.ctx, tab1)).rejects.toThrow(QueueItemCancelledError);
				await expect(t.jobs.complete(t.ctx, claim!, 'late')).rejects.toThrow(StaleClaimError);
				expect(await t.jobs.result(t.ctx, done)).toBe('E');
				expect((await t.jobs.claim(t.ctx, { owner: 'w', limit: 10 })).map((c) => c.itemId).sort()).toEqual([tab2.id, stringTab.id].sort());
				await expect(t.jobs.cancelWhere(t.ctx, {})).rejects.toThrow(TypeError);
				await expect(t.jobs.add(t.ctx, 'x', { labels: { '': 1 } })).rejects.toThrow(TypeError);
			});

			it('reprioritizes unfinished items by label', async (test) => {
				await using t = await open();
				if (!t.jobs.reprioritize) return skip(test);
				await t.jobs.add(t.ctx, 'window-1-tab-1', { labels: { window: 1, tab: 1 } });
				await t.jobs.add(t.ctx, 'window-1-tab-2', { labels: { window: 1, tab: 2 } });
				await t.jobs.add(t.ctx, 'window-2', { priority: 1, labels: { window: 2, tab: 3 } });
				const changed = await t.jobs.reprioritize(t.ctx, { window: 1 }, (current, labels) => labels.tab === 2 ? 5 : current);
				expect(changed).toBe(1);
				expect((await t.jobs.claim(t.ctx, { owner: 'w', limit: 10 })).map((c) => c.value)).toEqual(['window-1-tab-2', 'window-2', 'window-1-tab-1']);
				const page = await t.jobs.inspect({ state: 'claimed', limit: 10, maximumScanned: 10 });
				expect(page.entries.map((entry) => entry.priority)).toEqual([0, 5, 1]);
			});

			it('abandons the live claims of one owner, or of every other owner', async (test) => {
				await using t = await open();
				if (!t.jobs.abandon) return skip(test);
				await t.jobs.add(t.ctx, 'a');
				await t.jobs.add(t.ctx, 'b');
				await t.jobs.add(t.ctx, 'c');
				const [old] = await t.jobs.claim(t.ctx, { owner: 'old-worker' });
				const [other] = await t.jobs.claim(t.ctx, { owner: 'other-worker' });
				const [current] = await t.jobs.claim(t.ctx, { owner: 'current' });
				expect(await t.jobs.abandon(t.ctx, { owner: 'old-worker' })).toBe(1);
				await expect(t.jobs.complete(t.ctx, old!, 'late')).rejects.toThrow(StaleClaimError);
				expect(await t.jobs.abandon(t.ctx, { exceptOwner: 'current' })).toBe(1);
				await expect(t.jobs.complete(t.ctx, other!, 'late')).rejects.toThrow(StaleClaimError);
				const again = await t.jobs.claim(t.ctx, { owner: 'current', limit: 10 });
				expect(again.map((c) => [c.value, c.attempt])).toEqual([['a', 2], ['b', 2]]);
				await t.jobs.complete(t.ctx, current!, 'C');
				await expect(t.jobs.abandon(t.ctx, { owner: '' })).rejects.toThrow(TypeError);
			});
		});
	});
}

/** Mark a case skipped when the store lacks an optional method. */
function skip(test: unknown): void {
	(test as { skip?: (message: string) => void }).skip?.('store does not provide this extension');
}
