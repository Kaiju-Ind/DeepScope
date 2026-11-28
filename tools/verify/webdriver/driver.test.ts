import { readFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { startDriver, StartupError } from './driver.mjs';
import { DriverFixture } from './fixture.ts';

/** Retain every fixture before launch, including fixtures whose startup rejects. */
const fixtures: DriverFixture[] = [];
afterEach(async () => { await Promise.all(fixtures.splice(0).map((fixture) => fixture.close())); });

/** Record test-owned paths before any assertion can interrupt the scenario. */
async function fixture(mode = 'normal'): Promise<DriverFixture> {
	const value = await DriverFixture.create(mode);
	fixtures.push(value);
	return value;
}

/** The launcher must join the native close event rather than only send a signal. */
function stopped(pid: number | undefined): void {
	expect(pid).toBeTypeOf('number');
	expect(() => process.kill(pid!, 0)).toThrow(expect.objectContaining({ code: 'ESRCH' }));
}

describe.skipIf(process.platform === 'win32')('WebDriver native process ownership', () => {
	it('waits for actual readiness and shares joined shutdown', async () => {
		const value = await fixture('delayed-ready');
		const driver = await value.start();
		expect((await readFile(join(value.directory, 'requests'), 'utf8')).match(/GET \/status/g)).toHaveLength(3);
		const closing = driver.close();
		expect(driver.close()).toBe(closing);
		await closing;
		stopped(driver.diagnostics().pid);
		await expect(driver.request('GET', '/fixture/null')).rejects.toThrow('WebDriver is closing');
	});

	it.each(['not-ready', 'missing-readiness', 'stall-startup'])('rejects %s within the startup budget and disposes the process', async (mode) => {
		const value = await fixture(mode);
		const error = await value.start({ startupTimeoutMs: 350 }).catch((cause: unknown) => cause);
		expect(error).toBeInstanceOf(StartupError);
		if (!(error instanceof StartupError)) throw error;
		expect(error.message).toContain('within 350ms');
		stopped(error.diagnostics.pid);
	});

	it('rejects an occupied port without adopting or stopping the existing server', async () => {
		const value = await fixture();
		const held = createServer();
		await new Promise<void>((resolve) => held.listen(value.port, '127.0.0.1', resolve));
		try {
			await expect(value.start()).rejects.toMatchObject({ cause: { code: 'EADDRINUSE' }, diagnostics: { pid: undefined } });
			expect(held.listening).toBe(true);
			await expect(readFile(join(value.directory, 'pid'))).rejects.toMatchObject({ code: 'ENOENT' });
		} finally { await new Promise<void>((resolve) => held.close(() => resolve())); }
	});

	it('retains a caught spawn error and the final bounded failed-launch log', async () => {
		const value = await fixture('exit');
		await expect(startDriver(join(value.directory, 'missing'), [], { port: value.port, logPath: join(value.directory, 'missing.log') }))
			.rejects.toMatchObject({ cause: { code: 'ENOENT' }, diagnostics: { processError: expect.stringContaining('ENOENT') } });
		const error = await value.start().catch((cause: unknown) => cause);
		if (!(error instanceof StartupError)) throw error;
		expect(error.diagnostics.exitCode).toBe(7);
		expect(error.diagnostics.output).toHaveLength(16_384);
		expect(error.diagnostics.output).toMatch(/driver launch rejected$/);
		stopped(error.diagnostics.pid);
	});

	it('fails log acquisition before launching a native child', async () => {
		const value = await fixture();
		await expect(value.start({ logPath: value.directory })).rejects.toMatchObject({ cause: { code: 'EISDIR' } });
		await expect(readFile(join(value.directory, 'pid'))).rejects.toMatchObject({ code: 'ENOENT' });
	});

	it('keeps stderr written after stdout closes in the shared native log', async () => {
		const driver = await (await fixture('split-output')).start();
		await vi.waitFor(() => expect(driver.diagnostics().output).toContain('late stderr preserved'));
		await driver.close();
		expect(driver.diagnostics().output).toBe('stdout finished\nlate stderr preserved\n');
	});

	it('treats a signaled startup exit as a process failure', async () => {
		const error = await (await fixture('signal-exit')).start().catch((cause: unknown) => cause);
		if (!(error instanceof StartupError)) throw error;
		expect(error.diagnostics.signal).toBe('SIGTERM');
		stopped(error.diagnostics.pid);
	});

	it('joins forced shutdown and stops children in its own group', async () => {
		const stubborn = await (await fixture('ignore-term')).start();
		await stubborn.close();
		expect(stubborn.diagnostics().signal).toBe('SIGKILL');
		stopped(stubborn.diagnostics().pid);
		const parent = await (await fixture('child')).start();
		const child = await parent.request('GET', '/fixture/child');
		await parent.close();
		stopped(parent.diagnostics().pid);
		stopped(child.pid);
	});

	it('aborts a body when the native driver exits', async () => {
		const driver = await (await fixture()).start({ requestTimeoutMs: 2_000 });
		await expect(driver.request('GET', '/fixture/die')).rejects.toThrow();
		await driver.close();
		expect(driver.diagnostics().exitCode).toBe(9);
		stopped(driver.diagnostics().pid);
	});

	it('disposes the native group when its caller cancels startup', async () => {
		const startup = new AbortController();
		const value = await fixture('not-ready');
		const starting = value.start({ signal: startup.signal });
		const rejected = expect(starting).rejects.toMatchObject({ cause: { message: 'startup canceled' } });
		await vi.waitFor(async () => expect(await readFile(join(value.directory, 'pid'), 'utf8')).toMatch(/^\d+$/));
		startup.abort(new Error('startup canceled'));
		await rejected;
		stopped(Number(await readFile(join(value.directory, 'pid'), 'utf8')));
	});
});
