import { spawnSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { workspace } from './fixture.ts';

/** Execute the actual Bash task with inert unzip/web-ext adapters, never a store request. */
const task = fileURLToPath(new URL('../../.mise/tasks/release/store-upload', import.meta.url));

describe.skipIf(process.platform === 'win32')('Firefox submission extraction ownership', () => {
	it.each([
		{ unzipStatus: 0, submitStatus: 0, expected: 0 },
		{ unzipStatus: 0, submitStatus: 17, expected: 17 },
		{ unzipStatus: 9, submitStatus: 0, expected: 9 },
	])('removes temporary files and retains exit $expected', ({ unzipStatus, submitStatus, expected }) => {
		const fixture = workspace();
		const bin = join(fixture.root, 'bin');
		const temp = join(fixture.root, 'temp');
		const called = join(fixture.root, 'submission.json');
		mkdirSync(bin);
		mkdirSync(temp);
		const unzip = join(bin, 'unzip');
		writeFileSync(unzip, `#!/usr/bin/env bash\nset -eu\nprintf 'extracted bytes' > "$4/manifest.json"\nexit ${unzipStatus}\n`);
		chmodSync(unzip, 0o755);
		const submission = join(bin, 'web-ext');
		writeFileSync(submission, `#!${process.execPath}\n` + `
const fs = require('node:fs');
const args = process.argv.slice(2);
const source = args[args.indexOf('--source-dir') + 1];
fs.writeFileSync(${JSON.stringify(called)}, JSON.stringify({args, extracted:fs.readFileSync(source + '/manifest.json', 'utf8')}));
process.exit(${submitStatus});
`);
		chmodSync(submission, 0o755);
		const result = spawnSync('bash', [task], {
			cwd: fixture.checkout, encoding: 'utf8', timeout: 5_000,
			env: {
				...process.env, PATH: `${bin}:${process.env.PATH}`, TMPDIR: temp,
				usage_store: 'firefox', usage_dir: fixture.root, usage_version: '0.1.0',
				WEB_EXT_API_KEY: 'inert-fixture-key', WEB_EXT_API_SECRET: 'inert-fixture-secret',
			},
		});
		expect(result.status, result.stderr).toBe(expected);
		expect(readdirSync(temp)).toEqual([]);
		if (unzipStatus === 0) {
			const record = JSON.parse(readFileSync(called, 'utf8'));
			expect(record.extracted).toBe('extracted bytes');
			expect(record.args).toEqual([
				'sign', '--channel', 'listed', '--source-dir', expect.stringMatching(`${temp}/`),
				'--upload-source-code', join(fixture.root, 'deepscope-0.1.0-firefox-sources.zip'),
				'--approval-timeout', '0', '--no-input',
			]);
		} else expect(existsSync(called)).toBe(false);
	});
});
