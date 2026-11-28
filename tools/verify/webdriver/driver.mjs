// @ts-check
import { spawn } from 'node:child_process';
import { closeSync, fstatSync, openSync, readSync } from 'node:fs';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { request } from './protocol.mjs';

/** The report retains only the final 16 KiB; the complete native log stays on disk. */
const LOG_TAIL_BYTES = 16_384;

/** A startup failure includes the process evidence captured after attempted disposal. */
export class StartupError extends Error {
	/** @param {unknown} cause Startup or combined startup/cleanup failure. @param {ReturnType<typeof diagnostics>} evidence Final native state. */
	constructor(cause, evidence) {
		super(`WebDriver startup failed: ${cause instanceof Error ? cause.message : String(cause)}`, { cause });
		this.name = 'WebDriverStartupError';
		this.diagnostics = evidence;
	}
}

/**
 * Own one native driver and every HTTP request made through it.
 *
 * Open the log before spawning, then give both output descriptors to the child.
 * The parent closes its copy immediately. Startup failure stops acquired work;
 * a successful caller must await `close()`. The supplied signal cancels startup;
 * after acquisition, callers cancel individual requests and perform bounded
 * session cleanup before closing the driver. POSIX shutdown signals only the
 * new process group. Browser processes outside it require protocol cleanup.
 *
 * @param {string} command Native driver executable.
 * @param {string[]} args Arguments passed directly, without a shell.
 * @param {{ port: number, logPath: string, env?: NodeJS.ProcessEnv, signal?: AbortSignal, startupTimeoutMs?: number, requestTimeoutMs?: number, shutdownTimeoutMs?: number }} options Owned endpoint, cancellation, diagnostics and finite budgets.
 */
export async function startDriver(command, args, {
	port, logPath, env, signal, startupTimeoutMs = 10_000, requestTimeoutMs = 30_000, shutdownTimeoutMs = 2_000,
}) {
	if (!Number.isInteger(port) || port < 1 || port > 65_535) throw new RangeError('WebDriver port must be between 1 and 65535.');
	for (const timeout of [startupTimeoutMs, requestTimeoutMs, shutdownTimeoutMs]) {
		if (!Number.isInteger(timeout) || timeout < 1 || timeout > 2_147_483_647) throw new RangeError('WebDriver budgets must be positive finite milliseconds.');
	}
	const base = `http://127.0.0.1:${port}`;
	/** @type {ReturnType<typeof own> | undefined} Installed before any child event can fire. */
	let owner;
	/** @type {Promise<void> | undefined} Disposal callers share failures as well as success. */
	let closing;
	/** @returns {Promise<void>} Join the driver and its owned group before returning. */
	function close() {
		closing ??= owner ? owner.stop(shutdownTimeoutMs) : Promise.resolve();
		return closing;
	}
	/** Preserve native evidence without exposing the mutable child process. */
	function snapshot() { return diagnostics(logPath, owner?.child, owner?.error()); }
	try {
		signal?.throwIfAborted();
		await available(port);
		signal?.throwIfAborted();
		const descriptor = openSync(logPath, 'w', 0o600);
		try {
			owner = own(spawn(command, args, {
				env: { ...process.env, ...env }, stdio: ['ignore', descriptor, descriptor],
				detached: process.platform !== 'win32',
			}));
		} finally {
			closeSync(descriptor);
		}
		const startup = signal ? AbortSignal.any([signal, owner.signal]) : owner.signal;
		await ready(base, startup, startupTimeoutMs);
		startup.throwIfAborted();
		const lifetime = owner.signal;
		return {
			close, diagnostics: snapshot,
			/**
			 * Cancel only this exchange on its deadline or caller signal.
			 * @param {string} method HTTP method.
			 * @param {string} path Protocol path.
			 * @param {unknown} [body] Optional command body.
			 * @param {{timeoutMs?: number, signal?: AbortSignal}} [options] Per-command policy.
			 */
			request(method, path, body, options = {}) {
				const signal = options.signal ? AbortSignal.any([lifetime, options.signal]) : lifetime;
				return request(base, method, path, body, { signal, timeoutMs: options.timeoutMs ?? requestTimeoutMs });
			},
		};
	} catch (cause) {
		try { await close(); } catch (cleanupError) {
			throw new StartupError(new AggregateError([cause, cleanupError], 'Driver startup and cleanup both failed.'), snapshot());
		}
		throw new StartupError(cause, snapshot());
	}
}

/**
 * Register error, exit and close immediately; exit cancels requests before stdio closes.
 * @param {import('node:child_process').ChildProcess} child Process created by this owner.
 */
function own(child) {
	const lifetime = new AbortController();
	/** @type {PromiseWithResolvers<void>} One close event settles every shutdown wait. */
	const closed = Promise.withResolvers();
	/** @type {Error | undefined} Preserve asynchronous spawn or signal errors. */
	let processError;
	let finished = false;
	/** @param {Error} error Native child-process failure. */
	function failed(error) { processError = error; lifetime.abort(error); }
	child.on('error', failed);
	child.once('exit', (code, signal) => lifetime.abort(new Error(`WebDriver exited (code ${code}, signal ${signal}).`)));
	child.once('close', () => { finished = true; child.off('error', failed); closed.resolve(); });

	/** @param {NodeJS.Signals} signal Signal only the group established by this spawn. */
	function terminate(signal) {
		if (!child.pid) return;
		try {
			if (process.platform !== 'win32') process.kill(-child.pid, signal);
			else if (!finished) child.kill(signal);
		} catch (error) {
			if (!(error instanceof Error && 'code' in error && error.code === 'ESRCH')) throw error;
		}
	}
	return {
		child, signal: lifetime.signal, error: () => processError,
		/** @param {number} timeoutMs Grace for each joined shutdown step. */
		async stop(timeoutMs) {
			lifetime.abort(new Error('WebDriver is closing.'));
			terminate('SIGTERM');
			if (!await within(closed.promise, timeoutMs)) {
				terminate('SIGKILL');
				if (!await within(closed.promise, timeoutMs)) throw new Error('WebDriver did not close after SIGKILL.');
			}
			// A child may outlive the driver; terminate remaining members of this group.
			if (process.platform !== 'win32') terminate('SIGKILL');
		},
	};
}

/** @param {Promise<void>} closed Shared process-close promise. @param {number} timeoutMs Finite wait. */
async function within(closed, timeoutMs) {
	/** @type {ReturnType<typeof setTimeout> | undefined} Release the losing timer. */
	let timer;
	try {
		return await Promise.race([closed.then(() => true), new Promise((resolve) => { timer = setTimeout(() => resolve(false), timeoutMs); })]);
	} finally { clearTimeout(timer); }
}

/** @param {string} base Owned loopback origin. @param {AbortSignal} signal Process lifetime. @param {number} timeoutMs One startup budget. */
async function ready(base, signal, timeoutMs) {
	const expires = performance.now() + timeoutMs;
	let lastError;
	while (performance.now() < expires) {
		signal.throwIfAborted();
		try {
			const status = await request(base, 'GET', '/status', undefined, { signal, timeoutMs: Math.max(1, Math.ceil(expires - performance.now())) });
			if (status?.ready === true) return;
			throw new Error(`Driver is not ready: ${String(status?.message ?? 'value.ready is not true').slice(0, 500)}`);
		} catch (error) {
			lastError = error;
			signal.throwIfAborted();
			const remaining = expires - performance.now();
			if (remaining > 0) {
				try { await delay(Math.min(100, remaining), undefined, { signal }); }
				catch (cause) { signal.throwIfAborted(); throw cause; }
			}
		}
	}
	throw new Error(`WebDriver did not become ready within ${timeoutMs}ms: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

/**
 * Reject an existing listener before launch. Releasing this probe is not an atomic handoff.
 * @param {number} port Requested loopback port.
 */
async function available(port) {
	await new Promise((resolve, reject) => {
		const probe = createServer();
		probe.once('error', reject);
		probe.listen(port, '127.0.0.1', () => probe.close((error) => error ? reject(error) : resolve(undefined)));
	});
}

/**
 * Read only the final bytes of the retained log, including output written after stdout closed.
 * @param {string} logPath Harness-owned log file.
 * @param {import('node:child_process').ChildProcess} [child] Absent if acquisition failed before spawn.
 * @param {Error} [processError] Native process error, if any.
 */
function diagnostics(logPath, child, processError) {
	let output = '', logReadError;
	try {
		const descriptor = openSync(logPath, 'r');
		try {
			const size = fstatSync(descriptor).size;
			const buffer = Buffer.alloc(Math.min(LOG_TAIL_BYTES, size));
			const count = readSync(descriptor, buffer, 0, buffer.length, Math.max(0, size - buffer.length));
			output = buffer.subarray(0, count).toString('utf8');
		} finally { closeSync(descriptor); }
	} catch (error) { logReadError = error instanceof Error ? error.message : String(error); }
	return { logPath, output, logReadError, pid: child?.pid, exitCode: child?.exitCode, signal: child?.signalCode, processError: processError?.message };
}
