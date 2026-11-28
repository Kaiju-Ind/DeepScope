import { access, chmod, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { launch, StartupError } from './process.mjs';

/** Real child processes exercise HTTP cancellation, exit signals and profile ownership. */
const sessions: Array<Awaited<ReturnType<typeof launch>>> = [];
/** Fixture executables belong to the test; browser profiles belong to the launcher. */
const directories: string[] = [];

afterEach(async () => {
	const results = await Promise.allSettled(sessions.splice(0).map((session) => session.close()));
	await Promise.all(directories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
	const failures = results.filter((result) => result.status === 'rejected');
	if (failures.length) throw new AggregateError(failures.map((result) => result.reason), 'Browser fixture cleanup failed.');
});

/** Create a small executable that accepts the launcher's actual Chromium arguments. */
async function executable(mode = 'normal'): Promise<string> {
	const directory = await mkdtemp(join(tmpdir(), 'deepscope-browser-fixture-'));
	directories.push(directory);
	const path = join(directory, 'browser.mjs');
	await writeFile(path, `#!/usr/bin/env node
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
const mode = ${JSON.stringify(mode)};
const port = Number(process.argv.find((arg) => arg.startsWith('--remote-debugging-port=')).split('=')[1]);
if (mode === 'exit') {
  process.stderr.write('x'.repeat(20_000) + 'launch rejected', () => process.exit(7));
} else {
  if (mode === 'ignore-term') process.on('SIGTERM', () => {});
  let child;
  if (mode === 'child') {
    child = spawn(process.execPath, ['-e', 'setInterval(() => {}, 1000)'], { stdio: 'ignore' });
    process.on('SIGTERM', () => {
      if (child.exitCode !== null || child.signalCode !== null) process.exit(0);
      else child.once('close', () => process.exit(0));
    });
  }
  const server = createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    if (request.url === '/json/version' && mode !== 'stall-startup') {
      response.end(JSON.stringify({ webSocketDebuggerUrl: 'ws://127.0.0.1:' + port + '/devtools/browser/fixture' }));
    } else if (request.url === '/hang' || mode === 'stall-startup') {
      process.stderr.write('response body left open\\n');
      response.write('{');
    } else if (request.url === '/die') {
      response.write('{');
      setTimeout(() => process.exit(9), 25);
    } else if (request.url === '/quit') {
      response.end('{}');
      setTimeout(() => process.kill(process.pid, 'SIGTERM'), 25);
    } else {
      response.end(JSON.stringify({ method: request.method, url: request.url, childPid: child?.pid }));
    }
  });
  server.listen(port, '127.0.0.1');
}
`);
	await chmod(path, 0o755);
	return path;
}

/** Retain successful sessions before assertions so a failed test still stops its process. */
async function open(mode = 'normal', options = {}) {
	const session = await launch({
		artifactDirectory: tmpdir(), chrome: await executable(mode),
		startupTimeoutMs: 2_000, requestTimeoutMs: 150, shutdownTimeoutMs: 150,
		...options,
	});
	sessions.push(session);
	return session;
}

/** A closed native child must be reaped, not merely sent a termination signal. */
function expectStopped(pid: number): void {
	expect(() => process.kill(pid, 0)).toThrow(expect.objectContaining({ code: 'ESRCH' }));
}

// The fixture uses a POSIX executable and tests POSIX process-group termination.
describe.skipIf(process.platform === 'win32')('Chrome process ownership', () => {
	it('owns requests and deletes the profile only after an idempotent close', async () => {
		const browser = await open();
		const before = browser.diagnostics();
		await expect(access(before.profileDirectory)).resolves.toBeUndefined();
		await expect(browser.request('/json/new?fixture', { method: 'PUT' })).resolves.toMatchObject({ method: 'PUT' });
		const closed = browser.close();
		expect(browser.close()).toBe(closed);
		await closed;
		expectStopped(before.pid);
		await expect(access(before.profileDirectory)).rejects.toMatchObject({ code: 'ENOENT' });
	});

	it('preserves failed-launch exit status and a bounded final stderr tail', async () => {
		const error = await launch({ artifactDirectory: tmpdir(), chrome: await executable('exit') }).catch((failure) => failure);
		expect(error).toBeInstanceOf(StartupError);
		expect(error.diagnostics.exitCode).toBe(7);
		expect(error.message).toContain('exit code 7');
		expect(error.diagnostics.stderr).toHaveLength(16_384);
		expect(error.diagnostics.stderr).toMatch(/launch rejected$/);
		expectStopped(error.diagnostics.pid);
		await expect(access(error.diagnostics.profileDirectory)).rejects.toMatchObject({ code: 'ENOENT' });
	});

	it('handles an asynchronous spawn error and releases its already-created profile', async () => {
		const directory = await mkdtemp(join(tmpdir(), 'deepscope-missing-browser-'));
		directories.push(directory);
		const error = await launch({ artifactDirectory: tmpdir(), chrome: join(directory, 'missing') }).catch((failure) => failure);
		expect(error).toBeInstanceOf(StartupError);
		expect(error.cause).toMatchObject({ code: 'ENOENT' });
		expect(error.diagnostics.processError).toContain('ENOENT');
		await expect(access(error.diagnostics.profileDirectory)).rejects.toMatchObject({ code: 'ENOENT' });
	});

	it('bounds startup when the DevTools response body never finishes', async () => {
		const error = await launch({
			artifactDirectory: tmpdir(), chrome: await executable('stall-startup'), startupTimeoutMs: 600,
		}).catch((failure) => failure);
		expect(error).toBeInstanceOf(StartupError);
		expect(error.message).toContain('within 600ms');
		expect(error.diagnostics.stderr).toContain('response body left open');
		expectStopped(error.diagnostics.pid);
		await expect(access(error.diagnostics.profileDirectory)).rejects.toMatchObject({ code: 'ENOENT' });
	});

	it('awaits forced process exit before removing the profile', async () => {
		const browser = await open('ignore-term');
		await browser.close();
		const final = browser.diagnostics();
		expect(final.signal).toBe('SIGKILL');
		expectStopped(final.pid);
		await expect(access(final.profileDirectory)).rejects.toMatchObject({ code: 'ENOENT' });
	});

	it('cancels one stalled response without closing healthy requests', async () => {
		const browser = await open();
		await expect(browser.request('/hang')).rejects.toMatchObject({ name: 'TimeoutError' });
		await expect(browser.request('/healthy')).resolves.toMatchObject({ url: '/healthy' });
	});

	it('honors caller cancellation without revoking the browser lifetime', async () => {
		const browser = await open('normal', { requestTimeoutMs: 2_000 });
		const caller = new AbortController();
		const request = browser.request('/hang', { signal: caller.signal });
		const canceled = expect(request).rejects.toThrow('caller canceled this read');
		await vi.waitFor(() => expect(browser.diagnostics().stderr).toContain('response body left open'));
		caller.abort(new Error('caller canceled this read'));
		await canceled;
		await expect(browser.request('/healthy')).resolves.toMatchObject({ url: '/healthy' });
	});

	it('aborts an outstanding body read when the browser exits', async () => {
		const browser = await open('normal', { requestTimeoutMs: 2_000 });
		await expect(browser.request('/die')).rejects.toThrow();
		await browser.close();
		expect(browser.diagnostics().exitCode).toBe(9);
		expectStopped(browser.diagnostics().pid);
	});

	it('accepts an already signaled exit and rejects later requests', async () => {
		const browser = await open();
		await browser.request('/quit');
		await vi.waitFor(() => expect(browser.diagnostics().signal).toBe('SIGTERM'));
		await browser.close();
		await expect(browser.request('/later')).rejects.toThrow();
		expectStopped(browser.diagnostics().pid);
	});

	it('terminates the browser child process in the same owned group', async () => {
		const browser = await open('child');
		const { childPid } = await browser.request('/child');
		expect(childPid).toBeTypeOf('number');
		await browser.close();
		expectStopped(childPid);
		expectStopped(browser.diagnostics().pid);
	});
});
