import { describe, expect, it, vi } from 'vitest';

import * as queue from '@/lib/matcher/offscreen/queue';

type RequestType = { readonly id: string; readonly priority: number };

function createQueue(limit = 3, onPosition?: queue.QueuePositionType<RequestType>) {
	return queue.create<RequestType, string>({
		limit,
		getId: (request) => request.id,
		getPriority: (request) => request.priority,
		onPosition,
	});
}

describe('offscreen matcher queue', () => {
	it('keeps FIFO order inside the same priority', async () => {
		const jobs = createQueue();
		const first = jobs.add({ id: 'first', priority: 1 });
		const second = jobs.add({ id: 'second', priority: 1 });

		const firstEntry = jobs.take();
		const secondEntry = jobs.take();
		firstEntry?.resolve('first-result');
		secondEntry?.resolve('second-result');

		expect(firstEntry?.request.id).toBe('first');
		expect(secondEntry?.request.id).toBe('second');
		await expect(first).resolves.toBe('first-result');
		await expect(second).resolves.toBe('second-result');
	});

	it('claims higher-priority jobs before older lower-priority jobs', async () => {
		const jobs = createQueue();
		const evidence = jobs.add({ id: 'evidence', priority: 2 });
		const complete = jobs.add({ id: 'complete', priority: 1 });

		const completeEntry = jobs.take();
		const evidenceEntry = jobs.take();
		expect(completeEntry?.request.id).toBe('complete');
		expect(evidenceEntry?.request.id).toBe('evidence');
		completeEntry?.resolve('complete-result');
		evidenceEntry?.resolve('evidence-result');
		await expect(complete).resolves.toBe('complete-result');
		await expect(evidence).resolves.toBe('evidence-result');
	});

	it('rejects new observation batches after the retention limit is reached', async () => {
		const jobs = createQueue(1);
		const retained = jobs.add({ id: 'retained', priority: 1 });

		await expect(jobs.add({ id: 'rejected', priority: 1 })).rejects.toBeInstanceOf(queue.QueueFullError);
		expect(jobs.size).toBe(1);
		jobs.take()?.resolve('retained-result');
		await expect(retained).resolves.toBe('retained-result');
	});

	it('releases queued work immediately when its job is canceled', async () => {
		const jobs = createQueue();
		const pending = jobs.add({ id: 'cancel-me', priority: 1 });

		expect(jobs.cancel('cancel-me')).toBe(true);
		expect(jobs.size).toBe(0);
		await expect(pending).rejects.toThrow('canceled before dispatch');
	});

	it('publishes queue positions after additions and claims', async () => {
		const onPosition = vi.fn();
		const jobs = createQueue(3, onPosition);
		const later = jobs.add({ id: 'later', priority: 2 });
		const first = jobs.add({ id: 'first', priority: 1 });
		onPosition.mockClear();

		const firstEntry = jobs.take();

		expect(onPosition).toHaveBeenCalledWith(
			expect.objectContaining({ id: 'later' }),
			1,
			1,
			expect.any(Number),
		);
		firstEntry?.resolve('first-result');
		jobs.take()?.resolve('later-result');
		await expect(first).resolves.toBe('first-result');
		await expect(later).resolves.toBe('later-result');
	});
});
