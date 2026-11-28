// Minimal W3C WebDriver client over fetch. No dependencies, so the verify
// scripts run with plain `node` and a driver binary (geckodriver, safaridriver).
import { spawn } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';

/** Start a driver process on `port` and wait until it answers /status. */
export async function startDriver(command, args, { port, logPath, env } = {}) {
	const child = spawn(command, args, { env: { ...process.env, ...env }, stdio: ['ignore', 'pipe', 'pipe'] });
	if (logPath) {
		const log = createWriteStream(logPath);
		child.stdout.pipe(log);
		child.stderr.pipe(log);
	} else {
		child.stdout.resume();
		child.stderr.resume();
	}
	const base = `http://127.0.0.1:${port}`;
	for (let attempt = 0; attempt < 100; attempt++) {
		if (child.exitCode !== null) throw new Error(`${command} exited with ${child.exitCode}`);
		try {
			const response = await fetch(`${base}/status`);
			if (response.ok) return { child, base };
		} catch {
			// Not listening yet.
		}
		await delay(100);
	}
	child.kill();
	throw new Error(`${command} did not start on port ${port}`);
}

/** One WebDriver session. */
export class Session {
	/** Retain the driver's endpoint and session identity; creation and teardown remain explicit protocol operations. */
	constructor(base, id) {
		this.base = base;
		this.id = id;
	}

	/** Create a WebDriver session with caller-selected capabilities and retain the returned session identity. */
	static async create(base, capabilities) {
		const value = await request(base, 'POST', '/session', { capabilities });
		return new Session(base, value.sessionId);
	}

	/** Scope a protocol command to this session while leaving endpoint-specific payloads with the caller. */
	cmd(method, path, body) {
		return request(this.base, method, `/session/${this.id}${path}`, body);
	}

	/** Navigate the currently selected browsing context and let the driver apply its configured page-load policy. */
	navigate(url) { return this.cmd('POST', '/url', { url }); }
	/** Read the selected context's current URL from the driver rather than cached navigation intent. */
	url() { return this.cmd('GET', '/url'); }
	/** Read the driver's current browsing-context handles for window and tab lifecycle checks. */
	handles() { return this.cmd('GET', '/window/handles'); }
	/** Read the currently selected browsing-context handle before an operation may change focus. */
	handle() { return this.cmd('GET', '/window'); }
	/** Select an existing driver context without creating or navigating a new one. */
	switchTo(handle) { return this.cmd('POST', '/window', { handle }); }
	/** Create a tab by default and return its handle; the caller decides when to select and close it. */
	async newWindow(type = 'tab') { return (await this.cmd('POST', '/window/new', { type })).handle; }
	/** Close only the current browsing context, retaining the WebDriver session for remaining windows. */
	close() { return this.cmd('DELETE', '/window'); }
	/** Execute a synchronous script in the selected context with positional arguments and driver-provided serialization. */
	exec(script, args = []) { return this.cmd('POST', '/execute/sync', { script, args }); }
	/** Execute a callback-completing script under the session's configured script timeout. */
	execAsync(script, args = []) { return this.cmd('POST', '/execute/async', { script, args }); }
	/** Set driver timeout policy explicitly for the caller's scenario instead of embedding delays in protocol methods. */
	setTimeouts(timeouts) { return this.cmd('POST', '/timeouts', timeouts); }
	/** Best-effort session teardown that tolerates a driver or browser already closed by the scenario. */
	quit() { return request(this.base, 'DELETE', `/session/${this.id}`).catch(() => undefined); }
}

/** Send a JSON WebDriver command, unwrap its value and retain protocol error details on rejected requests. */
async function request(base, method, path, body) {
	const response = await fetch(`${base}${path}`, {
		method,
		headers: { 'content-type': 'application/json' },
		...(body === undefined ? {} : { body: JSON.stringify(body) }),
	});
	const json = await response.json().catch(() => ({}));
	if (!response.ok || json.value?.error) {
		const error = new Error(`${method} ${path}: ${json.value?.error ?? response.status} ${json.value?.message ?? ''}`.trim());
		error.webdriver = json.value;
		throw error;
	}
	return json.value;
}
