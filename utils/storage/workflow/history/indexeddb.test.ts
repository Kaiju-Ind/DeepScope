// DeepScope's own test: workflow history stores, memory and IndexedDB; not vendored.
import 'fake-indexeddb/auto';
import { expect } from '@std/expect';
import { describe, it } from 'node:test';

import * as context from '@utils/context';
import * as schema from '@utils/schema';
import { StaleClaimError } from '@utils/scheduler/queue';
import * as workflow from '@utils/workflow';
import * as history from '@utils/workflow/history';

import { open } from '../../indexeddb.ts';
import { indexeddb as queueStore } from '../../queue/indexeddb.ts';
import { indexeddb } from './indexeddb.ts';

let databases = 0;
const name = () => `history-${++databases}`;

const Timer = workflow.define({ id: 'history.timer', version: '1', input: schema.string(), result: schema.string() });
const timer = workflow.implement(Timer, function* () {
	const first = yield* workflow.sleep('PT1S');
	const second = yield* workflow.sleep('PT2S');
	return `${first.toString()} ${second.toString()}`;
});

/** Run the timer workflow once and count the sleeps actually dispatched. */
async function runTimer(records: workflow.History, runId: string, calls: { count: number }): Promise<string> {
	await using parent = context.create({ id: `parent-${runId}` });
	await using scheduler = workflow.scheduler({
		history: records,
		async command(_ctx, command) {
			if (command.type !== 'sleep') throw new Error('Unexpected command.');
			calls.count++;
			return workflow.success(Temporal.Instant.from(`2026-01-02T03:04:0${calls.count}Z`));
		},
	});
	await using ctx = await workflow.context({ definition: Timer, runId, input: '', ctx: parent });
	return await workflow.run({ ctx, implementation: timer, scheduler });
}

/** A history input for one sleep at `path`, with a JSON codec for string results. */
async function input(runId: string, path: string, next: () => Promise<workflow.WorkflowCompletionAny>) {
	const parent = context.create({ id: `parent-${runId}-${path}` });
	const ctx = await workflow.context({ definition: Timer, runId, input: '', ctx: parent });
	const step = workflow.sleep('PT1S')[Symbol.iterator]().next();
	if (step.done) throw new Error('Sleep yielded nothing.');
	const value: workflow.HistoryInput = {
		ctx,
		instruction: step.value,
		path,
		identity: await workflow.identify(step.value, path),
		next,
		async encode(completion) {
			if (completion.type !== 'success') throw new TypeError('Expected success.');
			return { type: 'success', value: { kind: 'value', value: completion.value as string } };
		},
		async decode(completion) {
			if (completion.type !== 'success' || completion.value.kind !== 'value') throw new TypeError('Expected a value.');
			return workflow.success(completion.value.value);
		},
	};
	return Object.assign(value, {
		async [Symbol.asyncDispose]() {
			await ctx[Symbol.asyncDispose]();
			await parent[Symbol.asyncDispose]();
		},
	});
}

const stores: Record<string, (maximumEntries?: number) => workflow.History & { inspect(runId: string): unknown }> = {
	memory: (maximumEntries) => history.memory(maximumEntries ? { maximumEntries } : {}),
	indexeddb: (maximumEntries) => indexeddb({ database: name(), ...(maximumEntries ? { maximumEntries } : {}) }),
};

for (const [store, create] of Object.entries(stores)) {
	describe(`workflow history: ${store}`, () => {
		it('replays recorded instructions instead of dispatching them again', async () => {
			await using records = create();
			const calls = { count: 0 };
			const first = await runTimer(records, 'run-1', calls);
			expect(await runTimer(records, 'run-1', calls)).toBe(first);
			expect(calls.count).toBe(2);
			expect(JSON.stringify(await records.inspect('run-1'))).toContain('2026-01-02T03:04:02Z');
		});

		it('runs one instruction once for concurrent callers', async () => {
			await using records = create();
			let release!: () => void;
			const gate = new Promise<void>((resolve) => release = resolve);
			let calls = 0;
			await using entry = await input('run-2', 'p/0', async () => {
				calls++;
				await gate;
				return workflow.success('done');
			});
			const both = Promise.all([records.schedule(entry), records.schedule(entry)]);
			await new Promise((resolve) => setTimeout(resolve, 10));
			release();
			expect(await both).toEqual([workflow.success('done'), workflow.success('done')]);
			expect(calls).toBe(1);
		});

		it('rejects a changed instruction at a recorded path', async () => {
			await using records = create();
			await using entry = await input('run-3', 'p/0', async () => workflow.success('done'));
			await records.schedule(entry);
			const changed = { ...entry, identity: { ...entry.identity, fingerprint: 'changed' } };
			await expect(records.schedule(changed)).rejects.toThrow(history.ReplayError);
		});

		it('refuses instructions beyond its capacity', async () => {
			await using records = create(1);
			await using first = await input('run-4', 'p/0', async () => workflow.success('a'));
			await using second = await input('run-4', 'p/1', async () => workflow.success('b'));
			await records.schedule(first);
			await expect(records.schedule(second)).rejects.toThrow(history.HistoryCapacityError);
		});
	});
}

describe('workflow history: indexeddb only', () => {
	it('replays after the history is reopened, as after a service worker restart', async () => {
		const database = name();
		const calls = { count: 0 };
		{
			await using records = indexeddb({ database });
			await runTimer(records, 'restart', calls);
		}
		await using reopened = indexeddb({ database });
		await runTimer(reopened, 'restart', calls);
		expect(calls.count).toBe(2);
		expect(await reopened.forget('restart')).toBe(2);
		expect((await reopened.inspect('restart')).entries).toEqual([]);
	});

	it('records a completion only while the queue claim it depends on is live', async () => {
		const db = await open(name());
		const clock = new context.TestClock();
		await using ctx = context.create({ id: 'fence', clock });
		await using jobs = queueStore<string, string>({ database: db, namespace: 'analysis', clock });
		await jobs.add(ctx, 'page');
		const [claim] = await jobs.claim(ctx, { owner: 'worker', duration: 'PT10S' });
		await using records = indexeddb({ database: db, clock, fence: () => ({ namespace: 'analysis', claim: claim! }) });
		await using live = await input('fenced', 'p/0', async () => workflow.success('kept'));
		expect(await records.schedule(live)).toEqual(workflow.success('kept'));
		clock.advance({ seconds: 10 });
		await using late = await input('fenced', 'p/1', async () => workflow.success('lost'));
		await expect(records.schedule(late)).rejects.toThrow(StaleClaimError);
		const entries = (await records.inspect('fenced')).entries;
		expect(entries.map((entry) => [entry.path, entry.completion !== undefined])).toEqual([['p/0', true], ['p/1', false]]);
		db.close();
	});
});
