import { chmod, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { startDriver } from './driver.mjs';

/** Native protocol fixtures expose real socket, log and process lifetimes. */
export class DriverFixture {
	/** A successful launch is retained before assertions so failure cannot orphan it. */
	driver?: Awaited<ReturnType<typeof startDriver>>;
	/** Paths belong to one test; the driver owner controls its process and open log. */
	private constructor(readonly directory: string, readonly command: string, readonly port: number) {}

	/** Create a small executable that accepts the actual Firefox/Safari driver arguments. */
	static async create(mode = 'normal'): Promise<DriverFixture> {
		const directory = await mkdtemp(join(tmpdir(), 'deepscope-webdriver-fixture-'));
		try {
			const command = join(directory, 'driver.mjs');
			await writeFile(command, `#!${process.execPath}
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { appendFileSync, rmSync, writeFileSync } from 'node:fs';
const mode = ${JSON.stringify(mode)};
const directory = ${JSON.stringify(directory)};
const port = Number(process.argv[process.argv.indexOf('--port') + 1]);
writeFileSync(directory + '/pid', String(process.pid));
let statusCount = 0;
let child;
if (mode === 'child') {
  child = spawn(process.execPath, ['-e', 'setInterval(() => {}, 1000)'], { stdio: 'ignore' });
  process.on('SIGTERM', () => child.exitCode !== null || child.signalCode !== null ? process.exit(0) : child.once('close', () => process.exit(0)));
}
if (mode === 'ignore-term') process.on('SIGTERM', () => {});
if (mode !== 'ignore-term' && mode !== 'child') process.on('SIGTERM', function stop() {
  appendFileSync(directory + '/requests', 'SIGNAL SIGTERM\\n');
  process.off('SIGTERM', stop); process.kill(process.pid, 'SIGTERM');
});
if (mode === 'signal-exit') process.kill(process.pid, 'SIGTERM');
if (mode === 'split-output') {
  process.stdout.end('stdout finished\\n');
  setTimeout(() => process.stderr.write('late stderr preserved\\n'), 100);
}
if (mode === 'exit') process.stderr.write('x'.repeat(20000) + 'driver launch rejected', () => process.exit(7));
else createServer(async (request, response) => {
  appendFileSync(directory + '/requests', request.method + ' ' + request.url + '\\n');
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString()) : undefined;
  const send = (value, status = 200) => { response.writeHead(status, { 'content-type': 'application/json' }); response.end(JSON.stringify({ value })); };
  if (request.url === '/status') {
    if (mode === 'stall-startup') { response.writeHead(200); response.write('{'); }
    else send(mode === 'missing-readiness' ? {} : { ready: mode !== 'not-ready' && (mode !== 'delayed-ready' || ++statusCount > 2), message: 'fixture readiness' });
  } else if (request.url === '/session') {
    if (mode === 'session-stall') { response.writeHead(200); response.write('{'); }
    else if (mode === 'session-failure') send({ error: 'session not created', message: 'fixture session rejected' }, 500);
    else if (mode === 'automation-off') send({ error: 'session not created', message: 'Please allow remote automation' }, 500);
    else if (mode === 'missing-id') send({ capabilities: {} });
    else if (mode === 'empty-id') send({ sessionId: '', capabilities: {} });
    else if (mode.startsWith('missing-capabilities')) send({ sessionId: 'fixture' });
    else send({ sessionId: mode === 'encoded-id' ? 'session/with spaces' : 'fixture', capabilities: { browserName: 'fixture' } });
  } else if (request.url === '/fixture/hang-body' || request.url === '/fixture/die') {
    response.writeHead(200); response.write('{'); process.stderr.write('body left open\\n');
    if (request.url.endsWith('/die')) setTimeout(() => process.exit(9), 25);
  } else if (request.url === '/fixture/hang-headers') {
    process.stderr.write('headers left open\\n');
  } else if (request.url === '/fixture/invalid-json') {
    response.writeHead(200); response.end('{bad JSON');
  } else if (request.url === '/fixture/missing-value') {
    response.writeHead(200); response.end('{}');
  } else if (request.url === '/fixture/application-error') {
    send({ error: 'application value', message: 'successful script result' });
  } else if (request.url === '/fixture/error') {
    send({ error: 'invalid argument', message: 'fixture protocol rejection' }, 400);
  } else if (request.url === '/fixture/child') {
    send({ pid: child?.pid });
  } else if (request.url.endsWith('/timeouts') && (mode === 'timeout-failure' || body.script === 1)) {
    send({ error: 'invalid argument', message: 'fixture timeouts rejected' }, 400);
  } else if (request.url.endsWith('/timeouts') && mode === 'copy-failure') {
    rmSync(directory + '/extension', { recursive: true, force: true }); send(null);
  } else if (request.url.endsWith('/timeouts') && mode === 'timeout-stall') {
    response.writeHead(200); response.write('{');
  } else if (request.url.endsWith('/window') && mode.startsWith('scenario-')) {
    send({ error: 'no such window', message: 'fixture scenario rejected' }, 404);
  } else if (request.method === 'DELETE' && request.url === '/session/fixture') {
    if (mode.endsWith('quit-error')) send({ error: 'unknown error', message: 'fixture quit rejected' }, 500);
    else if (mode === 'quit-absent') send({ error: 'invalid session id', message: 'session already closed' }, 404);
    else if (mode.endsWith('quit-stall')) { response.writeHead(200); response.write('{'); }
    else send(null);
  } else if (typeof body?.script === 'string' && body.script.startsWith('delay:')) {
    setTimeout(() => send('delayed script'), Number(body.script.slice(6)));
  } else if (request.url.endsWith('/url') && request.method === 'POST') {
    setTimeout(() => send(null), Number(new URL(body.url).searchParams.get('delay') ?? 0));
  } else if (request.url.endsWith('/window/new')) {
    send({ handle: 'new-context', type: body.type });
  } else if (request.url.endsWith('/window')) {
    send('main');
  } else {
    send(null);
  }
}).listen(port, '127.0.0.1');
`);
			await chmod(command, 0o755);
			const probe = createServer();
			await new Promise<void>((resolve, reject) => { probe.once('error', reject); probe.listen(0, '127.0.0.1', resolve); });
			const address = probe.address();
			await new Promise<void>((resolve, reject) => probe.close((error) => error ? reject(error) : resolve()));
			if (!address || typeof address === 'string') throw new Error('No fixture port was assigned.');
			return new DriverFixture(directory, command, address.port);
		} catch (error) {
			await rm(directory, { recursive: true, force: true });
			throw error;
		}
	}

	/** Start through the real owner with short test budgets, retaining cleanup before assertions. */
	async start(options: Partial<Parameters<typeof startDriver>[2]> = {}): Promise<Awaited<ReturnType<typeof startDriver>>> {
		this.driver = await startDriver(this.command, ['--port', String(this.port)], {
			port: this.port, logPath: join(this.directory, 'driver.log'),
			startupTimeoutMs: 2_000, requestTimeoutMs: 100, shutdownTimeoutMs: 150, ...options,
		});
		return this.driver;
	}

	/** Stop the owned process before removing evidence created by the test. */
	async close(): Promise<void> {
		try { await this.driver?.close(); }
		finally { await rm(this.directory, { recursive: true, force: true }); }
	}
}
