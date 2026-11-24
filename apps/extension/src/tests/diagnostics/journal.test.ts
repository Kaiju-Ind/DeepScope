import { afterEach, describe, expect, it, vi } from 'vitest';

import { DIAGNOSTIC_TRANSPORT_CHANNEL } from '@/lib/diagnostics/contracts';
import { createDiagnosticJournalSink, getDiagnosticRecords } from '@/lib/diagnostics/journal';

const JOURNAL_STATE_KEY = '__kaijuDeepScopeDiagnosticJournalV3';

type Stored = Record<string, unknown>;

function installStorage() {
	const values: Stored = {};
	const local = {
		async get(keys?: null | string | readonly string[]) {
			if (keys == null) return { ...values };
			const selected = Array.isArray(keys) ? keys : [keys];
			return Object.fromEntries(selected.filter((key) => key in values).map((key) => [key, values[key]]));
		},
		async set(items: Stored) {
			Object.assign(values, items);
		},
		async remove(keys: string | readonly string[]) {
			for (const key of Array.isArray(keys) ? keys : [keys]) delete values[key];
		},
	};
	vi.stubGlobal('chrome', { storage: { local } });
	return values;
}

function makeRecord(index: number, level: 'debug' | 'error' = 'debug') {
	return {
		category: ['kaiju-deepscope', 'background', 'matcher'],
		level,
		message: ['matcher partition complete'],
		rawMessage: 'matcher partition complete',
		timestamp: 1_700_000_000_000 + index,
		properties: { event: 'matcher-partition-complete', partitionId: `partition-${index}` },
	} as const;
}

afterEach(() => {
	vi.useRealTimers();
	vi.unstubAllGlobals();
	delete (globalThis as Record<string, unknown>)[JOURNAL_STATE_KEY];
});

describe('diagnostic journal', () => {
	it('compacts high-volume successful records without rate-dropping the diagnostic fact', async () => {
		vi.useFakeTimers();
		installStorage();
		const sink = createDiagnosticJournalSink('background');

		for (let index = 0; index < 30; index += 1) sink(makeRecord(index));
		await vi.advanceTimersByTimeAsync(1_000);
		const records = await getDiagnosticRecords(100);
		const summary = records.find((record) => record.repeatCount !== undefined);

		expect(records.length).toBe(21);
		expect(summary).toMatchObject({
			level: 'debug',
			repeatCount: 10,
			properties: expect.objectContaining({
				event: 'matcher-partition-complete',
				suppressedCount: 10,
				acceptedCount: 20,
			}),
		});
	});

	it('persists failures outside successful-record compaction', async () => {
		vi.useFakeTimers();
		installStorage();
		const sink = createDiagnosticJournalSink('background');

		for (let index = 0; index < 30; index += 1) sink(makeRecord(index));
		sink(makeRecord(31, 'error'));
		const records = await getDiagnosticRecords(100);

		expect(records.some((record) => record.level === 'error')).toBe(true);
		expect(records.some((record) => record.repeatCount === 10)).toBe(true);
	});

	it('forwards sanitized records through runtime messaging when the context has no storage API', () => {
		const sendMessage = vi.fn(async () => undefined);
		vi.stubGlobal('chrome', { runtime: { sendMessage } });
		const sink = createDiagnosticJournalSink('offscreen');

		sink(makeRecord(1));

		expect(sendMessage).toHaveBeenCalledWith(expect.objectContaining({
			channel: DIAGNOSTIC_TRANSPORT_CHANNEL,
			type: 'diagnostics.context',
			context: expect.objectContaining({ surface: 'offscreen' }),
		}));
		expect(sendMessage).toHaveBeenCalledWith(expect.objectContaining({
			channel: DIAGNOSTIC_TRANSPORT_CHANNEL,
			type: 'diagnostics.record',
			record: expect.objectContaining({
				surface: 'offscreen',
				message: 'matcher partition complete',
			}),
		}));
	});

	it('forwards dedicated-worker diagnostics to the parent offscreen host when runtime APIs are unavailable', () => {
		const postMessage = vi.fn();
		vi.stubGlobal('postMessage', postMessage);
		const sink = createDiagnosticJournalSink('matcher-worker');

		sink(makeRecord(2));

		expect(postMessage).toHaveBeenCalledWith(expect.objectContaining({
			channel: DIAGNOSTIC_TRANSPORT_CHANNEL,
			type: 'diagnostics.context',
			context: expect.objectContaining({ surface: 'matcher-worker' }),
		}));
		expect(postMessage).toHaveBeenCalledWith(expect.objectContaining({
			channel: DIAGNOSTIC_TRANSPORT_CHANNEL,
			type: 'diagnostics.record',
			record: expect.objectContaining({ surface: 'matcher-worker' }),
		}));
	});
});
