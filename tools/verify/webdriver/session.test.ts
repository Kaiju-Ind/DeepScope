import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DriverFixture } from './fixture.ts';
import { Session } from './session.mjs';

/** Native fixtures remain owned even when a session fails validation. */
const fixtures: DriverFixture[] = [];
afterEach(async () => { await Promise.all(fixtures.splice(0).map((fixture) => fixture.close())); });

/** Start one local protocol fixture before exercising the actual client. */
async function fixture(mode = 'normal', timeoutMs = 100): Promise<DriverFixture> {
	const value = await DriverFixture.create(mode);
	fixtures.push(value);
	await value.start({ requestTimeoutMs: timeoutMs });
	return value;
}

describe.skipIf(process.platform === 'win32')('WebDriver protocol and sessions', () => {
	it.each(['missing-id', 'empty-id', 'missing-capabilities'])('rejects %s before constructing a session URL', async (mode) => {
		const value = await fixture(mode);
		await expect(Session.create(value.driver!, {})).rejects.toThrow('Invalid WebDriver New Session response');
		const requests = await readFile(join(value.directory, 'requests'), 'utf8');
		if (mode === 'missing-capabilities') expect(requests).toContain('DELETE /session/fixture');
		else expect(requests).not.toContain('DELETE /session/');
	});

	it('keeps void and error-shaped application values distinct from protocol errors', async () => {
		const { driver } = await fixture();
		await expect(driver!.request('POST', '/fixture/null', {})).resolves.toBeNull();
		await expect(driver!.request('GET', '/fixture/application-error')).resolves.toEqual({ error: 'application value', message: 'successful script result' });
		await expect(driver!.request('GET', '/fixture/error')).rejects.toMatchObject({ name: 'WebDriverError', status: 400, webdriver: { error: 'invalid argument', message: 'fixture protocol rejection' } });
	});

	it('retains capability validation and failed partial-session cleanup as separate causes', async () => {
		const value = await fixture('missing-capabilities-quit-error');
		const error = await Session.create(value.driver!, {}).catch((cause: unknown) => cause);
		expect(error).toBeInstanceOf(AggregateError);
		if (!(error instanceof AggregateError)) throw error;
		expect(error.errors).toEqual([
			expect.objectContaining({ message: expect.stringContaining('expected a capabilities object') }),
			expect.objectContaining({ webdriver: { error: 'unknown error', message: 'fixture quit rejected' } }),
		]);
	});

	it.each(['invalid-json', 'missing-value'])('rejects %s instead of returning undefined success', async (route) => {
		const { driver } = await fixture();
		await expect(driver!.request('GET', `/fixture/${route}`)).rejects.toThrow('Invalid WebDriver');
	});

	it.each(['hang-headers', 'hang-body'])('bounds %s and leaves subsequent requests healthy', async (route) => {
		const { driver } = await fixture();
		await expect(driver!.request('GET', `/fixture/${route}`)).rejects.toMatchObject({ name: 'TimeoutError' });
		await expect(driver!.request('GET', '/fixture/null')).resolves.toBeNull();
	});

	it('honors caller cancellation after headers without revoking the driver', async () => {
		const { driver } = await fixture('normal', 2_000);
		const caller = new AbortController();
		const request = driver!.request('GET', '/fixture/hang-body', undefined, { signal: caller.signal });
		const rejected = expect(request).rejects.toThrow('caller canceled');
		await vi.waitFor(() => expect(driver!.diagnostics().output).toContain('body left open'));
		caller.abort(new Error('caller canceled'));
		await rejected;
		await expect(driver!.request('GET', '/fixture/null')).resolves.toBeNull();
	});

	it('encodes the returned session identity as one URL component', async () => {
		const value = await fixture('encoded-id');
		const session = await Session.create(value.driver!, {});
		await session.url();
		expect(await readFile(join(value.directory, 'requests'), 'utf8')).toContain('GET /session/session%2Fwith%20spaces/url');
	});

	it('cancels ordinary work but attempts bounded remote cleanup before driver shutdown', async () => {
		const value = await fixture();
		const cancellation = new AbortController();
		const session = await Session.create(value.driver!, {}, { signal: cancellation.signal });
		cancellation.abort(new Error('verification canceled'));
		await expect(session.url()).rejects.toThrow('verification canceled');
		await session.quit();
		await value.driver!.close();
		const requests = await readFile(join(value.directory, 'requests'), 'utf8');
		expect(requests).toContain('DELETE /session/fixture');
		expect(requests.indexOf('DELETE /session/fixture')).toBeLessThan(requests.indexOf('SIGNAL SIGTERM'));
	});

	it('lets scripts and navigation exceed the metadata budget under their accepted policies', async () => {
		const { driver } = await fixture('normal', 40);
		const session = await Session.create(driver!, {}, { transportGraceMs: 40 });
		await session.setTimeouts({ script: 120, pageLoad: 120 });
		await expect(session.execAsync('delay:80')).resolves.toBe('delayed script');
		await expect(session.navigate('http://fixture.test/?delay=80')).resolves.toBeNull();
		await expect(session.setTimeouts({ script: 1 })).rejects.toThrow('fixture timeouts rejected');
		await expect(session.exec('delay:80')).resolves.toBe('delayed script');
		await expect(session.execAsync('delay:300')).rejects.toMatchObject({ name: 'TimeoutError' });
		await expect(session.url()).resolves.toBeNull();
	});

	it('preserves the actual Firefox and Safari budgets when selecting transport deadlines', async () => {
		/** Record the public transport contract without waiting several real minutes. */
		const requests: Array<{ path: string; timeoutMs?: number }> = [];
		const value = await fixture();
		const native = value.driver!;
		const driver = { ...native, request: async (...args: Parameters<typeof native.request>) => {
			requests.push({ path: args[1], timeoutMs: args[3]?.timeoutMs });
			return native.request(...args);
		} };
		const session = await Session.create(driver, {});
		await session.setTimeouts({ script: 180_000 });
		await session.execAsync('return null');
		await session.navigate('http://fixture.test/');
		await session.setTimeouts({ pageLoad: 30_000 });
		await session.navigate('http://fixture.test/');
		expect(requests.filter(({ path }) => path.endsWith('/execute/async') || path.endsWith('/url')).map(({ timeoutMs }) => timeoutMs)).toEqual([185_000, 305_000, 35_000]);
		await session.quit({ timeoutMs: undefined });
		expect(requests.at(-1)?.timeoutMs).toBe(5_000);
	});

	it('joins one bounded DELETE and preserves unexpected cleanup failures', async () => {
		const absent = await Session.create((await fixture('quit-absent')).driver!, {});
		await expect(absent.quit()).resolves.toBeUndefined();
		await expect(absent.url()).rejects.toThrow('session is closing');
		const failed = await Session.create((await fixture('quit-error')).driver!, {});
		const quitting = failed.quit();
		expect(failed.quit()).toBe(quitting);
		await expect(quitting).rejects.toThrow('fixture quit rejected');
		const stalled = await Session.create((await fixture('quit-stall')).driver!, {});
		await expect(stalled.quit({ timeoutMs: 100 })).rejects.toMatchObject({ name: 'TimeoutError' });
	});
});
