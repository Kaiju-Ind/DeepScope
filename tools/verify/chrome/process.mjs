import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

/** Keep the final browser diagnostics without retaining an unbounded output stream. */
const STDERR_TAIL_CHARS = 16_384;

/** A failed launch retains the browser's final process state after cleanup. */
export class StartupError extends Error {
	/** Preserve the original failure and the evidence captured after disposal. */
	constructor(cause, diagnostics) {
		super(`Chrome startup failed: ${cause instanceof Error ? cause.message : String(cause)}`, { cause });
		this.name = 'ChromeStartupError';
		this.diagnostics = diagnostics;
	}
}

/**
 * Own one isolated Chromium process, its profile and its DevTools HTTP requests.
 *
 * Startup failure disposes every resource acquired so far. A successful caller
 * must await `close()`; it stops the browser before deleting its profile. The
 * deadlines also cover response bodies, and a process exit aborts current reads.
 * POSIX launches own a process group so termination reaches browser children.
 */
export async function launch({
	artifactDirectory,
	chrome,
	startupTimeoutMs = 15_000,
	requestTimeoutMs = 15_000,
	shutdownTimeoutMs = 2_000,
}) {
	/** Resources are acquired in order and released through the single close promise. */
	let profileDirectory;
	let processOwner;
	let closing;

	/** Include the profile path on partial startup failures so cleanup is inspectable. */
	function diagnostics() {
		return { profileDirectory, ...processOwner?.diagnostics() };
	}

	/** Repeated callers share shutdown; a profile is removed only after process closure. */
	function close() {
		closing ??= (async () => {
			await processOwner?.stop(shutdownTimeoutMs);
			if (profileDirectory) await rm(profileDirectory, { recursive: true, force: true });
		})();
		return closing;
	}

	try {
		profileDirectory = await mkdtemp(join(tmpdir(), 'kaiju-deepscope-chrome-'));
		const port = await availablePort();
		const args = [
			`--remote-debugging-port=${port}`,
			`--user-data-dir=${profileDirectory}`,
			`--disable-extensions-except=${artifactDirectory}`,
			`--load-extension=${artifactDirectory}`,
			'--no-first-run',
			'--no-default-browser-check',
			'--disable-background-networking',
			'--disable-component-update',
			'--disable-sync',
			'--disable-gpu',
			'--headless=new',
			'about:blank',
		];
		// Preserve the existing root-only launch policy; ordinary runners keep their sandbox.
		if (typeof process.getuid === 'function' && process.getuid() === 0) args.unshift('--no-sandbox');
		processOwner = own(spawn(chrome, args, {
			stdio: ['ignore', 'ignore', 'pipe'],
			detached: process.platform !== 'win32',
		}));
		const endpoint = `http://127.0.0.1:${port}`;
		const version = await ready(endpoint, processOwner.signal, startupTimeoutMs);
		return {
			port,
			version,
			diagnostics,
			close,
			/** Open a target or read a DevTools endpoint within this browser's lifetime. */
			request(path, init) {
				return fetchJson(`${endpoint}${path}`, init, processOwner.signal, requestTimeoutMs);
			},
		};
	} catch (cause) {
		try {
			await close();
		} catch (cleanupError) {
			throw new StartupError(new AggregateError([cause, cleanupError],
				`${cause instanceof Error ? cause.message : String(cause)}; browser cleanup failed: ${cleanupError.message}`), diagnostics());
		}
		throw new StartupError(cause, diagnostics());
	}
}

/** Observe spawn errors immediately and retain one close promise for every cleanup wait. */
function own(child) {
	const lifetime = new AbortController();
	/** Process-local state survives stream closure so failed starts retain their cause. */
	let stderr = '';
	let processError;
	let finished = false;
	let resolveClosed;
	const closed = new Promise((resolve) => { resolveClosed = resolve; });

	/** Drain stderr continuously, retaining only the bounded tail used by failure reports. */
	function capture(chunk) {
		stderr = `${stderr}${chunk}`.slice(-STDERR_TAIL_CHARS);
	}
	/** A failed spawn must reject startup instead of becoming an unhandled error event. */
	function failed(error) {
		processError = error;
		lifetime.abort(error);
	}
	/** Close follows process exit and stdio closure, so its diagnostics include final output. */
	function finishedProcess(code, signal) {
		finished = true;
		child.off('error', failed);
		child.stderr?.off('data', capture);
		lifetime.abort(new Error(`Chrome closed (exit code ${code}, signal ${signal}).`));
		resolveClosed();
	}
	child.stderr?.setEncoding('utf8');
	child.stderr?.on('data', capture);
	child.on('error', failed);
	child.once('close', finishedProcess);

	/** Signal only this owned process group; an already removed group needs no further work. */
	function terminate(signal) {
		if (!child.pid) return;
		try {
			if (process.platform !== 'win32') process.kill(-child.pid, signal);
			else if (!finished) child.kill(signal);
		} catch (error) {
			if (error.code !== 'ESRCH') throw error;
		}
	}

	return {
		signal: lifetime.signal,
		/** Snapshot only bounded process evidence, without exposing the mutable child handle. */
		diagnostics() {
			return { pid: child.pid, exitCode: child.exitCode, signal: child.signalCode, stderr, processError: processError?.message };
		},
		/** Await SIGKILL fallback as well as graceful exit before releasing the profile. */
		async stop(timeoutMs) {
			terminate('SIGTERM');
			if (!await within(closed, timeoutMs)) {
				terminate('SIGKILL');
				if (!await within(closed, timeoutMs)) throw new Error('Chrome did not close after SIGKILL; its profile was retained.');
			}
			// A browser may exit before a child. Remove any remaining members of its group.
			if (process.platform !== 'win32') terminate('SIGKILL');
		},
	};
}

/** Bound a shared close promise without adding an exit listener on every wait. */
async function within(closed, timeoutMs) {
	let timer;
	try {
		return await Promise.race([
			closed.then(() => true),
			new Promise((resolve) => { timer = setTimeout(() => resolve(false), timeoutMs); }),
		]);
	} finally {
		clearTimeout(timer);
	}
}

/** Poll within one monotonic startup budget, including stalled response bodies. */
async function ready(endpoint, signal, timeoutMs) {
	const expires = performance.now() + timeoutMs;
	let lastError;
	while (performance.now() < expires) {
		signal.throwIfAborted();
		try {
			const version = await fetchJson(`${endpoint}/json/version`, undefined, signal, Math.ceil(expires - performance.now()));
			if (typeof version?.webSocketDebuggerUrl !== 'string' || !version.webSocketDebuggerUrl) {
				throw new Error('Chrome returned no browser debugger URL.');
			}
			return version;
		} catch (error) {
			lastError = error;
			signal.throwIfAborted();
			const remaining = expires - performance.now();
			if (remaining > 0) {
				try {
					await delay(Math.min(100, remaining), undefined, { signal });
				} catch (error) {
					// Preserve the process failure instead of the timer's generic AbortError.
					signal.throwIfAborted();
					throw error;
				}
			}
		}
	}
	throw new Error(`Chrome did not expose DevTools within ${timeoutMs}ms: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

/** Native fetch cancellation covers both the response headers and its JSON body. */
async function fetchJson(url, init, lifetime, timeoutMs) {
	const signal = AbortSignal.any([
		lifetime,
		AbortSignal.timeout(Math.max(1, timeoutMs)),
		...(init?.signal ? [init.signal] : []),
	]);
	const response = await fetch(url, { ...init, signal });
	if (!response.ok) {
		await response.body?.cancel();
		throw new Error(`${response.status} ${response.statusText} for ${url}`);
	}
	return await response.json();
}

/** Release the loopback probe before launch; Chromium will bind the selected port itself. */
async function availablePort() {
	return await new Promise((resolvePort, reject) => {
		const server = createServer();
		server.once('error', reject);
		server.listen(0, '127.0.0.1', () => {
			const address = server.address();
			if (!address || typeof address === 'string') {
				server.close(() => reject(new Error('Could not reserve a Chrome debugging port.')));
				return;
			}
			server.close((error) => error ? reject(error) : resolvePort(address.port));
		});
	});
}
