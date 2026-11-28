/**
 * `node:test` for the vendored Utils tests, backed by Vitest.
 *
 * Upstream tests register with `describe`/`it` from `node:test` so they run
 * unchanged under Deno, Node and Bun. Vitest does not collect `node:test`
 * registrations, so the `utils` project in `vitest.config.ts` aliases
 * `node:test` to this file. Only the surface the copied tests use is mapped:
 * `describe`, `it`/`test` with optional options, and the test context's
 * `signal`, `skip()` and `mock.timers`.
 *
 * DeepScope's own file, not vendored.
 */
import { describe as vitestDescribe, it as vitestIt, vi } from 'vitest';

interface Options {
	readonly skip?: boolean | string;
	readonly todo?: boolean | string;
	readonly only?: boolean;
	readonly timeout?: number;
	readonly concurrency?: number | boolean;
}

/** The part of Node's `TestContext` the copied tests read. */
export interface TestContext {
	readonly name: string;
	readonly signal: AbortSignal;
	skip(message?: string): void;
	readonly mock: {
		readonly timers: {
			enable(options?: { readonly apis?: readonly string[]; readonly now?: number }): void;
			tick(milliseconds: number): void;
			reset(): void;
		};
	};
}

type Body = (context: TestContext) => unknown;
type SuiteBody = () => unknown;

function split<T>(options: Options | T | undefined, body: T | undefined): [Options, T | undefined] {
	if (typeof options === 'function') return [{}, options as T];
	return [(options as Options | undefined) ?? {}, body];
}

function context(name: string, signal: AbortSignal, skip: (message?: string) => void): TestContext {
	return {
		name,
		signal,
		skip,
		mock: {
			timers: {
				enable(options = {}) {
					vi.useFakeTimers({
						...(options.apis ? { toFake: options.apis as NonNullable<Parameters<typeof vi.useFakeTimers>[0]>['toFake'] } : {}),
						...(options.now === undefined ? {} : { now: options.now }),
					});
				},
				tick(milliseconds) {
					vi.advanceTimersByTime(milliseconds);
				},
				reset() {
					vi.useRealTimers();
				},
			},
		},
	};
}

export function it(name: string, options?: Options | Body, body?: Body): void {
	const [settings, fn] = split<Body>(options, body);
	const run = fn === undefined
		? undefined
		: (task: { signal: AbortSignal; skip: (message?: string) => void }) => fn(context(name, task.signal, task.skip));
	if (settings.skip || settings.todo || run === undefined) {
		vitestIt.skip(name, () => {});
		return;
	}
	(settings.only ? vitestIt.only : vitestIt)(name, settings.timeout === undefined ? {} : { timeout: settings.timeout }, async ({ signal, skip }) => {
		try {
			await run({ signal, skip: (message) => skip(message) });
		} finally {
			vi.useRealTimers();
		}
	});
}

export const test = it;

export function describe(name: string, options?: Options | SuiteBody, body?: SuiteBody): void {
	const [settings, fn] = split<SuiteBody>(options, body);
	if (settings.skip || settings.todo || fn === undefined) {
		vitestDescribe.skip(name, () => {});
		return;
	}
	(settings.only ? vitestDescribe.only : vitestDescribe)(name, fn as () => void);
}

export const suite = describe;
export { afterAll as after, afterEach, beforeAll as before, beforeEach } from 'vitest';
