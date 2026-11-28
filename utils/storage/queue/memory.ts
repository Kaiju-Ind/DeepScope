/**
 * `queue.memory()` with labels, `cancelWhere()` and `abandon()`, for work that
 * must not reach disk (private tabs).
 *
 * The wrapper keeps the upstream memory queue unchanged and remembers what it
 * needs beside it: the labels of each unfinished item and the live claims it
 * handed out. `cancelWhere()` cancels matching items by reference, and
 * `abandon()` retries the selected claims with no delay, so both go through
 * the queue's own fenced transitions. `reprioritize()` is not provided: the
 * upstream memory queue cannot change a queued item's priority, and the method
 * is optional in the contract.
 *
 * DeepScope's own file, not vendored.
 *
 * @module
 */
import * as queue from '@utils/scheduler/queue';
import * as extension from '@utils/scheduler/queue/extensions';
import type { LabeledAddOptions, LabeledQueue, Labels, OwnerSelector, QueueExtensions } from '@utils/scheduler/queue/extensions';
import type { Context, MemoryQueueOptions, QueueClaim, QueueRef } from '@utils/scheduler/queue/types';

/** A labeled memory queue: `cancelWhere()` and `abandon()`, no `reprioritize()`. */
export type MemoryLabeledQueue<Input, Output> = LabeledQueue<Input, Output> & Required<Pick<QueueExtensions, 'cancelWhere' | 'abandon'>>;

/** Create a process-local queue with the label extensions except `reprioritize()`. */
export function memory<Input, Output>(options: MemoryQueueOptions = {}): MemoryLabeledQueue<Input, Output> {
	const inner = queue.memory<Input, Output>(options);
	/** Labels of items this wrapper has not seen finish. */
	const labels = new Map<string, Labels>();
	/** Live claims this wrapper handed out, by item id. */
	const claims = new Map<string, QueueClaim<Input>>();

	const finished = (itemId: string) => {
		labels.delete(itemId);
		claims.delete(itemId);
	};
	const tracked = <T>(claim: QueueClaim<Input>, run: () => Promise<T>, terminal: boolean): Promise<T> =>
		run().then((value) => {
			if (terminal) finished(claim.itemId);
			else if (claims.get(claim.itemId)?.id === claim.id) claims.delete(claim.itemId);
			return value;
		});

	return Object.freeze({
		...inner,
		events: inner.events,
		async add(ctx: Context, input: Input, add: LabeledAddOptions = {}): Promise<QueueRef> {
			const { labels: itemLabels, ...rest } = add;
			const checked = extension.labels(itemLabels);
			const ref = await inner.add(ctx, input, rest);
			if (!labels.has(ref.id)) labels.set(ref.id, checked);
			return ref;
		},
		async claim(ctx, options) {
			const taken = await inner.claim(ctx, options);
			for (const claim of taken) claims.set(claim.itemId, claim);
			return taken;
		},
		complete: (ctx, claim, output) => tracked(claim, () => inner.complete(ctx, claim, output), true),
		fail: (ctx, claim, failure) => tracked(claim, () => inner.fail(ctx, claim, failure), true),
		retry: (ctx, claim, retry) => tracked(claim, () => inner.retry(ctx, claim, retry), false),
		async renew(ctx, claim, duration) {
			const renewed = await inner.renew(ctx, claim, duration);
			claims.set(renewed.itemId, renewed);
			return renewed;
		},
		async cancel(ctx, owner, reason) {
			await inner.cancel(ctx, owner, reason);
			finished('itemId' in owner ? owner.itemId : owner.id);
		},
		async cancelWhere(ctx: Context, where: Labels, reason?: unknown): Promise<number> {
			const selector = extension.selector(where);
			let count = 0;
			for (const [id, itemLabels] of [...labels]) {
				if (!extension.matches(itemLabels, selector)) continue;
				// Only complete, fail and cancel finish an item, and all three pass through
				// this wrapper, so every remembered item is still unfinished.
				finished(id);
				try {
					await inner.cancel(ctx, { id }, reason);
					count++;
				} catch (error) {
					if (!(error instanceof queue.QueueItemNotFoundError)) throw error;
				}
			}
			return count;
		},
		async abandon(ctx: Context, selector: OwnerSelector): Promise<number> {
			const selected = extension.owners(selector);
			let count = 0;
			for (const claim of [...claims.values()]) {
				if (!selected(claim.owner)) continue;
				claims.delete(claim.itemId);
				try {
					await inner.retry(ctx, claim);
					count++;
				} catch (error) {
					if (!(error instanceof queue.StaleClaimError) && !(error instanceof queue.QueueItemNotFoundError)) throw error;
				}
			}
			return count;
		},
	} satisfies MemoryLabeledQueue<Input, Output>);
}
