import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chmod, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it, vi } from 'vitest';
import { DriverFixture } from './fixture.ts';

/** The actual CLI is executed; only its native driver and Safari packager are controlled fixtures. */
const verifyDirectory = dirname(dirname(fileURLToPath(import.meta.url)));

/** Run one failing acquisition/report path and observe disposal before test cleanup intervenes. */
async function caller(browser: 'firefox' | 'safari', mode: string, options: { reportDirectory?: boolean; archiveFailure?: boolean; interrupt?: boolean; interruptAt?: 'session' | 'timeouts' } = {}) {
	const fixture = await DriverFixture.create(mode);
	let child: ReturnType<typeof spawn> | undefined;
	let closed: Promise<unknown> | undefined;
	/** The outer test only cleans a native group if an assertion exposes an ownership regression. */
	let pid: number | undefined;
	let timer: ReturnType<typeof setTimeout> | undefined;
	try {
		const extension = join(fixture.directory, 'extension');
		await mkdir(extension);
		await writeFile(join(extension, 'manifest.json'), JSON.stringify({ manifest_version: 3, name: 'CLI fixture', version: '1.0.0', background: { scripts: [] } }));
		const bin = join(fixture.directory, 'bin');
		await mkdir(bin);
		await writeFile(join(bin, 'xcrun'), '#!/bin/sh\nexit 0\n');
		await chmod(join(bin, 'xcrun'), 0o755);
		if (options.archiveFailure) {
			await writeFile(join(bin, 'zip'), '#!/bin/sh\necho "fixture archive rejected" >&2\nexit 23\n');
			await chmod(join(bin, 'zip'), 0o755);
		}
		const report = options.reportDirectory ? fixture.directory : join(fixture.directory, 'results.json');
		child = spawn(process.execPath, [join(verifyDirectory, `${browser}.mjs`),
			'--extension', extension, '--port', String(fixture.port), '--out', report,
			browser === 'firefox' ? '--geckodriver' : '--driver', fixture.command], {
			env: { ...process.env, TMPDIR: fixture.directory, PATH: `${bin}:${process.env.PATH}` },
			stdio: ['ignore', 'pipe', 'pipe'], detached: true,
		});
		let stdout = '', stderr = '';
		child.stdout!.setEncoding('utf8').on('data', (text: string) => { stdout += text; });
		child.stderr!.setEncoding('utf8').on('data', (text: string) => { stderr += text; });
		closed = once(child, 'close');
		if (options.interrupt) {
			await vi.waitFor(async () => expect(await readFile(join(fixture.directory, 'requests'), 'utf8')).toContain(options.interruptAt === 'timeouts' ? 'POST /session/fixture/timeouts' : 'POST /session'));
			child.kill('SIGTERM');
		}
		await Promise.race([closed, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`CLI fixture did not close: ${stdout}\n${stderr}`)), 9_000); })]);
		clearTimeout(timer);
		pid = Number(await readFile(join(fixture.directory, 'pid'), 'utf8'));
		// This assertion precedes the outer test's fallback termination.
		expect(() => process.kill(pid!, 0)).toThrow(expect.objectContaining({ code: 'ESRCH' }));
		const requests = await readFile(join(fixture.directory, 'requests'), 'utf8');
		const results = options.reportDirectory ? undefined : JSON.parse(await readFile(report, 'utf8'));
		return { exitCode: child.exitCode, stdout, stderr, requests, results };
	} finally {
		clearTimeout(timer);
		if (pid === undefined) pid = Number(await readFile(join(fixture.directory, 'pid'), 'utf8').catch(() => '')) || undefined;
		for (const ownedPid of [child?.pid, pid]) {
			if (!ownedPid) continue;
			try { process.kill(-ownedPid, 'SIGTERM'); } catch (error) {
				if (!(error instanceof Error && 'code' in error && error.code === 'ESRCH')) throw error;
			}
		}
		await delay(25);
		for (const ownedPid of [child?.pid, pid]) {
			if (!ownedPid) continue;
			try { process.kill(-ownedPid, 'SIGKILL'); } catch (error) {
				if (!(error instanceof Error && 'code' in error && error.code === 'ESRCH')) throw error;
			}
		}
		await closed;
		await fixture.close();
	}
}

describe.skipIf(process.platform === 'win32')('real verification CLI cleanup', () => {
	it.each(['firefox', 'safari'] as const)('%s stops its native driver after rejected session acquisition', async (browser) => {
		const result = await caller(browser, 'session-failure');
		expect(result.exitCode).toBe(1);
		expect(result.stdout).toContain('fixture session rejected');
		expect(result.requests).not.toContain('DELETE /session/fixture');
	});

	it.each(['firefox', 'safari'] as const)('%s deletes an acquired session after timeout setup rejects', async (browser) => {
		const result = await caller(browser, 'timeout-failure');
		expect(result.exitCode).toBe(1);
		expect(result.stdout).toContain('fixture timeouts rejected');
		expect(result.requests).toContain('DELETE /session/fixture');
	});

	it.each(['firefox', 'safari'] as const)('%s completes native cleanup before a report write fails', async (browser) => {
		const result = await caller(browser, 'scenario-failure', { reportDirectory: true });
		expect(result.exitCode).toBe(1);
		expect(result.stderr).toContain('EISDIR');
		expect(result.requests).toContain('DELETE /session/fixture');
	});

	it('preserves Safari owner-action exit status after joined cleanup', async () => {
		const result = await caller('safari', 'automation-off');
		expect(result.exitCode).toBe(2);
		expect(result.results).toContainEqual(expect.objectContaining({ scenario: 'session', pass: false, ownerAction: expect.stringContaining('Allow remote automation') }));
	});

	it.each(['copy', 'archive'])('closes Safari resources when diagnostic %s preparation fails', async (step) => {
		const result = await caller('safari', step === 'copy' ? 'copy-failure' : 'normal', { archiveFailure: step === 'archive' });
		expect(result.exitCode).toBe(1);
		expect(result.requests).toContain('DELETE /session/fixture');
		expect(result.stdout).toContain(step === 'copy' ? 'ENOENT' : 'fixture archive rejected');
	});

	it('preserves both the scenario and unexpected session-cleanup failure', async () => {
		const result = await caller('firefox', 'scenario-quit-error');
		expect(result.results).toEqual(expect.arrayContaining([
			expect.objectContaining({ scenario: 'driver', pass: false, error: expect.stringContaining('fixture scenario rejected') }),
			expect.objectContaining({ scenario: 'session-cleanup', pass: false, error: expect.stringContaining('fixture quit rejected') }),
		]));
	});

	it('reaches process cleanup after a DELETE response body never finishes', async () => {
		const result = await caller('firefox', 'scenario-quit-stall');
		expect(result.exitCode).toBe(1);
		expect(result.results).toContainEqual(expect.objectContaining({ scenario: 'session-cleanup', pass: false, error: expect.stringContaining('within 5000ms') }));
	}, 12_000);

	it.each(['firefox', 'safari'] as const)('%s cancels a partial session and joins cleanup on SIGTERM', async (browser) => {
		const result = await caller(browser, 'session-stall', { interrupt: true });
		expect(result.exitCode).toBe(143);
		expect(result.stdout).toContain('Verification interrupted by SIGTERM');
	});

	it.each(['firefox', 'safari'] as const)('%s attempts known-session DELETE before stopping its driver after interruption', async (browser) => {
		const result = await caller(browser, 'timeout-stall', { interrupt: true, interruptAt: 'timeouts' });
		expect(result.exitCode).toBe(143);
		expect(result.requests).toContain('DELETE /session/fixture');
		expect(result.requests.indexOf('DELETE /session/fixture')).toBeLessThan(result.requests.indexOf('SIGNAL SIGTERM'));
		expect(result.results).not.toContainEqual(expect.objectContaining({ scenario: 'session-cleanup' }));
	});
});
