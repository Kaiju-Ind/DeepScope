import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { expect, it } from 'vitest';
import { startFixtureServer } from './fixtures.mjs';

it('rejects an occupied listen port through the acquisition promise', async () => {
	const held = createServer();
	await new Promise<void>((resolve) => held.listen(0, '127.0.0.1', resolve));
	try {
		const address = held.address();
		if (!address || typeof address === 'string') throw new Error('No test port was assigned.');
		await expect(startFixtureServer(address.port)).rejects.toMatchObject({ code: 'EADDRINUSE' });
		expect(held.listening).toBe(true);
	} finally { await new Promise<void>((resolve) => held.close(() => resolve())); }
});

it('joins cancellation of a delayed response and rejects later connections', async () => {
	const fixture = await startFixtureServer();
	try {
		const request = fetch(`${fixture.origin}/plain.html?delay=30000`);
		const rejected = expect(request).rejects.toThrow();
		await delay(100);
		const closing = fixture.close();
		expect(fixture.close()).toBe(closing);
		await closing;
		await rejected;
		await expect(fetch(`${fixture.origin}/plain.html`)).rejects.toThrow();
	} finally { await fixture.close(); }
});

it('preserves marker pages, synthetic assets and missing-route responses', async () => {
	const fixture = await startFixtureServer();
	try {
		const page = await fetch(`${fixture.origin}/wp.html`);
		expect(page.headers.get('x-powered-by')).toBe('PHP/8.2.0');
		expect(await page.text()).toContain('WordPress 6.4.2');
		expect(await (await fetch(`${fixture.origin}/wp-includes/js/jquery/jquery.min.js`)).text()).toContain('jquery: "3.7.1"');
		const absent = await fetch(`${fixture.origin}/toString`);
		expect(absent.status).toBe(404);
		await absent.body?.cancel();
		const invalid = await fetch(`${fixture.origin}/plain.html?delay=Infinity`);
		expect(invalid.status).toBe(400);
		await invalid.body?.cancel();
	} finally { await fixture.close(); }
});
