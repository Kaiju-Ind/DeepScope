import { runInNewContext } from 'node:vm';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type DiagnosticCrashHooks, installDiagnosticCrashHooks } from '@/lib/diagnostics/crash';
import { clearDiagnosticJournal, getDiagnosticRecords } from '@/lib/diagnostics/journal';

/** Registrations belong to one isolated execution context and must be disposed after each scenario. */
const hooks: DiagnosticCrashHooks[] = [];
let events: EventTarget;

beforeEach(() => {
	events = new EventTarget();
	vi.stubGlobal('addEventListener', events.addEventListener.bind(events));
	vi.stubGlobal('removeEventListener', events.removeEventListener.bind(events));
	const records: Record<string, unknown> = {};
	vi.stubGlobal('chrome', {
		storage: {
			local: {
				async get() {
					return { ...records };
				},
				async set(values: Record<string, unknown>) {
					Object.assign(records, values);
				},
				async remove(keys: string[]) {
					for (const key of keys) delete records[key];
				},
			},
		},
	});
});

afterEach(async () => {
	try {
		for (const registration of hooks.splice(0)) registration.dispose();
		await clearDiagnosticJournal();
	} finally {
		vi.unstubAllGlobals();
		delete (globalThis as Record<string, unknown>).__kaijuDeepScopeDiagnosticJournalV3;
	}
});

/** Dispatch native events with the browser-owned error payload used by the crash API. */
function emit(type: string, details: Record<string, unknown> = {}): void {
	events.dispatchEvent(Object.assign(new Event(type), details));
}

describe('diagnostic crash hooks', () => {
	it('persists extension failures and structured-clone errors with sanitized error details', async () => {
		hooks.push(installDiagnosticCrashHooks('background'));
		emit('error', {
			error: new TypeError('request failed: token=private-value'),
			filename: 'background.js',
			lineno: 12,
			colno: 4,
		});
		emit('messageerror');

		const records = await getDiagnosticRecords();
		expect(records).toHaveLength(2);
		expect(records).toEqual(expect.arrayContaining([
			expect.objectContaining({
				surface: 'background',
				properties: expect.objectContaining({
					error: expect.objectContaining({ name: 'TypeError' }),
					filename: 'background.js',
					line: 12,
					column: 4,
				}),
			}),
			expect.objectContaining({ message: 'A structured-clone message could not be decoded.' }),
		]));
		expect(JSON.stringify(records)).not.toContain('private-value');
	});

	it('ignores host-page errors while capturing isolated content promise failures', async () => {
		hooks.push(installDiagnosticCrashHooks('content', { captureGlobalError: false }));
		emit('error', { error: new Error('unrelated host page failure') });
		expect(await getDiagnosticRecords()).toEqual([]);

		emit('unhandledrejection', { reason: new Error('content promise failed') });
		const records = await getDiagnosticRecords();
		expect(records).toHaveLength(1);
		expect(records[0]).toMatchObject({
			surface: 'content',
			properties: { error: { message: 'content promise failed' } },
		});
	});

	/**
	 * Found by the Firefox stress run: a content script's window also hears the
	 * host page's unhandled rejections, and each one was journaled as a
	 * DeepScope crash, with the page's URL in its stack.
	 */
	it('ignores a rejection whose promise the host page created', async () => {
		hooks.push(installDiagnosticCrashHooks('content', { captureGlobalError: false }));
		const pagePromise = runInNewContext('Promise.reject(new Error("page-owned rejection"))') as Promise<never>;
		pagePromise.catch(() => undefined);
		emit('unhandledrejection', { promise: pagePromise, reason: new Error('page-owned rejection') });
		expect(await getDiagnosticRecords()).toEqual([]);

		const ownPromise = Promise.reject(new Error('content promise failed'));
		ownPromise.catch(() => undefined);
		emit('unhandledrejection', { promise: ownPromise, reason: new Error('content promise failed') });
		expect(await getDiagnosticRecords()).toEqual([
			expect.objectContaining({ surface: 'content', properties: { error: expect.objectContaining({ message: 'content promise failed' }) } }),
		]);
	});

	it('keeps only the rejection type and fixed events for a private content context', async () => {
		const previous = installDiagnosticCrashHooks('content', { captureGlobalError: false });
		const current = installDiagnosticCrashHooks('content', { captureGlobalError: false, includeErrorDetails: false });
		hooks.push(previous, current);
		const reason = new Error('private failure at https://private-crash.example/page', {
			cause: new Error('private cause'),
		});
		reason.name = 'private custom error name';
		emit('error', { error: reason, filename: 'https://private-crash.example/host.js' });
		emit('unhandledrejection', { reason });
		emit('messageerror');

		const records = await getDiagnosticRecords();
		expect(records).toHaveLength(2);
		expect(records).toEqual(expect.arrayContaining([
			expect.objectContaining({ message: 'Unhandled promise rejection.', properties: { errorType: 'Error' } }),
			expect.objectContaining({ message: 'A structured-clone message could not be decoded.', properties: {} }),
		]));
		expect(JSON.stringify(records)).not.toMatch(/private-crash|private cause|private custom/);
	});

	it('reuses one registration and removes all listeners when its owner disposes', async () => {
		const registration = installDiagnosticCrashHooks('background');
		hooks.push(registration);
		expect(installDiagnosticCrashHooks('background')).toBe(registration);
		emit('messageerror');
		expect(await getDiagnosticRecords()).toHaveLength(1);
		registration.dispose();
		registration.dispose();
		emit('error', { error: new Error('after disposal') });
		emit('unhandledrejection', { reason: new Error('after disposal') });
		emit('messageerror');
		expect(await getDiagnosticRecords()).toHaveLength(1);
	});

	it('replaces an older surface without allowing its disposal to remove the new owner', async () => {
		const previous = installDiagnosticCrashHooks('background');
		const current = installDiagnosticCrashHooks('offscreen');
		hooks.push(previous, current);
		previous.dispose();
		emit('messageerror');
		const records = await getDiagnosticRecords();
		expect(records).toHaveLength(1);
		expect(records[0]?.surface).toBe('offscreen');
		expect(installDiagnosticCrashHooks('offscreen')).toBe(current);
	});
});
