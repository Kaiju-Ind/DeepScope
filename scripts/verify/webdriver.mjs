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
	constructor(base, id) {
		this.base = base;
		this.id = id;
	}

	static async create(base, capabilities) {
		const value = await request(base, 'POST', '/session', { capabilities });
		return new Session(base, value.sessionId);
	}

	cmd(method, path, body) {
		return request(this.base, method, `/session/${this.id}${path}`, body);
	}

	navigate(url) { return this.cmd('POST', '/url', { url }); }
	url() { return this.cmd('GET', '/url'); }
	handles() { return this.cmd('GET', '/window/handles'); }
	handle() { return this.cmd('GET', '/window'); }
	switchTo(handle) { return this.cmd('POST', '/window', { handle }); }
	async newWindow(type = 'tab') { return (await this.cmd('POST', '/window/new', { type })).handle; }
	close() { return this.cmd('DELETE', '/window'); }
	exec(script, args = []) { return this.cmd('POST', '/execute/sync', { script, args }); }
	execAsync(script, args = []) { return this.cmd('POST', '/execute/async', { script, args }); }
	setTimeouts(timeouts) { return this.cmd('POST', '/timeouts', timeouts); }
	quit() { return request(this.base, 'DELETE', `/session/${this.id}`).catch(() => undefined); }
}

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
