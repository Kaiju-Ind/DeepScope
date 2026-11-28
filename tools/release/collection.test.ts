import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { contents, workspace } from './fixture.ts';

describe('release collection ownership', () => {
	it.each(['.', '..', '.output', 'apps/extension', '.output/chrome-mv3', '.output/firefox-mv3/nested'])(
		'refuses %s without changing source or archive inputs', (out) => {
			const fixture = workspace();
			const before = contents(fixture.root);
			const result = fixture.command(['collect', '--out', out, 'chrome']);
			expect(result.status).toBe(1);
			expect(result.stderr).toMatch(/overlaps/);
			expect(contents(fixture.root)).toEqual(before);
		},
	);

	it('writes every requested public archive and verifies sums against its original input bytes', () => {
		const fixture = workspace();
		const input = join(fixture.checkout, '.output');
		const out = join(input, 'release');
		const result = fixture.command(['collect', '--out', out, 'chrome', 'firefox', 'safari']);
		expect(result.status, result.stderr).toBe(0);
		const expected = [
			['chrome', 'chrome'], ['firefox', 'firefox'], ['sources', 'firefox-sources'], ['safari', 'safari'],
		].map(([source, publicSuffix]) => {
			const name = `deepscope-0.1.0-${publicSuffix}.zip`;
			const original = readFileSync(join(input, `workspace-0.1.0-${source}.zip`));
			expect(readFileSync(join(out, name))).toEqual(original);
			return `${createHash('sha256').update(original).digest('hex')}  ${name}`;
		}).sort((a, b) => a.slice(66).localeCompare(b.slice(66)));
		expect(readFileSync(join(out, 'SHA256SUMS'), 'utf8')).toBe(`${expected.join('\n')}\n`);
		expect(readdirSync(out)).toHaveLength(5);
	});

	it.each([false, true])('supports an external candidate directory (already empty: %s)', (existing) => {
		const fixture = workspace();
		const out = join(fixture.root, 'external');
		if (existing) mkdirSync(out);
		const result = fixture.command(['collect', '--out', out, 'chrome']);
		expect(result.status, result.stderr).toBe(0);
		expect(readdirSync(out).sort()).toEqual(['SHA256SUMS', 'deepscope-0.1.0-chrome.zip']);
	});

	it('replaces a prior intact collection without retaining deselected browser archives', () => {
		const fixture = workspace();
		const out = join(fixture.checkout, '.output/release');
		expect(fixture.command(['collect', '--out', out, 'firefox', 'safari']).status).toBe(0);
		const result = fixture.command(['collect', '--out', out, 'chrome']);
		expect(result.status, result.stderr).toBe(0);
		expect(readdirSync(out).sort()).toEqual(['SHA256SUMS', 'deepscope-0.1.0-chrome.zip']);
		expect(readdirSync(join(fixture.checkout, '.output')).filter((name) => name.startsWith('.deepscope-release-'))).toEqual([]);
	});

	it.each(['unlisted file', 'changed archive', 'nested directory', 'archive symlink'])(
		'refuses a prior collection with an %s and preserves every entry', (kind) => {
			const fixture = workspace();
			const out = join(fixture.root, 'external');
			expect(fixture.command(['collect', '--out', out, 'chrome']).status).toBe(0);
			const archive = join(out, 'deepscope-0.1.0-chrome.zip');
			if (kind === 'unlisted file') writeFileSync(join(out, 'notes.txt'), 'unrelated file');
			else if (kind === 'changed archive') writeFileSync(archive, 'changed bytes');
			else if (kind === 'nested directory') mkdirSync(join(out, 'source'));
			else {
				rmSync(archive);
				symlinkSync(join(fixture.checkout, 'source.txt'), archive);
			}
			const before = contents(fixture.root);
			expect(fixture.command(['collect', '--out', out, 'firefox']).status).toBe(1);
			expect(contents(fixture.root)).toEqual(before);
		},
	);

	it('refuses a destination symlink without modifying its target', () => {
		const fixture = workspace();
		const target = join(fixture.root, 'candidate');
		mkdirSync(target);
		const alias = join(fixture.root, 'alias');
		symlinkSync(target, alias, 'dir');
		const before = contents(fixture.root);
		const result = fixture.command(['collect', '--out', alias, 'chrome']);
		expect(result.status).toBe(1);
		expect(result.stderr).toContain('refusing symlink output');
		expect(contents(fixture.root)).toEqual(before);
	});

	it.each(['apps/extension', '.output/chrome-mv3'])('resolves parent aliases before protecting %s', (target) => {
		const fixture = workspace();
		const alias = join(fixture.root, 'alias');
		symlinkSync(join(fixture.checkout, target), alias, 'dir');
		const before = contents(fixture.root);
		const result = fixture.command(['collect', '--out', join(alias, 'candidate'), 'chrome']);
		expect(result.status).toBe(1);
		expect(result.stderr).toContain('overlaps');
		expect(contents(fixture.root)).toEqual(before);
	});

	it('preserves a previous candidate when a selected archive cannot be copied', () => {
		const fixture = workspace();
		const out = join(fixture.checkout, '.output/release');
		expect(fixture.command(['collect', '--out', out, 'chrome']).status).toBe(0);
		const broken = join(fixture.checkout, '.output/workspace-0.1.0-firefox.zip');
		rmSync(broken);
		mkdirSync(broken);
		const before = contents(fixture.root);
		expect(fixture.command(['collect', '--out', out, 'firefox']).status).toBe(1);
		expect(contents(fixture.root)).toEqual(before);
	});

	it.each(['version mismatch', 'ambiguous archive', 'duplicate browser'])(
		'refuses %s before replacing a candidate', (kind) => {
			const fixture = workspace();
			const out = join(fixture.checkout, '.output/release');
			expect(fixture.command(['collect', '--out', out, 'chrome']).status).toBe(0);
			if (kind === 'version mismatch') writeFileSync(join(fixture.checkout, '.output/firefox-mv3/manifest.json'), '{"version":"0.2.0"}');
			if (kind === 'ambiguous archive') writeFileSync(join(fixture.checkout, '.output/stale-firefox.zip'), 'old archive');
			const before = contents(fixture.root);
			const browsers = kind === 'duplicate browser' ? ['firefox', 'firefox'] : ['firefox'];
			expect(fixture.command(['collect', '--out', out, ...browsers]).status).toBe(1);
			expect(contents(fixture.root)).toEqual(before);
		},
	);

	it.each([1, 2])('preserves the prior bytes when %i publication/restore renames fail', (failures) => {
		const fixture = workspace();
		const out = join(fixture.checkout, '.output/release');
		expect(fixture.command(['collect', '--out', out, 'chrome']).status).toBe(0);
		const previous = contents(out);
		const preload = join(fixture.root, 'rename-failure.cjs');
		// Only the filesystem failure is substituted. The actual CLI owns copying,
		// checksum validation, publication, restoration and cleanup in a real process.
		writeFileSync(preload, `
const fs = require('node:fs');
const rename = fs.renameSync;
let remaining = ${failures};
fs.renameSync = (from, to) => {
  if (to === ${JSON.stringify(out)} && remaining-- > 0) throw new Error('injected rename failure');
  return rename(from, to);
};
require('node:module').syncBuiltinESMExports();
`);
		const result = fixture.command(['collect', '--out', out, 'firefox'], preload);
		expect(result.status).toBe(1);
		expect(result.stderr).toContain('injected rename failure');
		const staging = readdirSync(join(fixture.checkout, '.output')).filter((name) => name.startsWith('.deepscope-release-'));
		if (failures === 1) {
			expect(contents(out)).toEqual(previous);
			expect(staging).toEqual([]);
		} else {
			expect(existsSync(out)).toBe(false);
			expect(staging).toHaveLength(1);
			const recovery = join(fixture.checkout, '.output', staging[0]!);
			expect(result.stderr).toContain(`both candidates remain in ${recovery}`);
			expect(contents(join(recovery, 'previous'))).toEqual(previous);
			expect(readFileSync(join(recovery, 'next', 'deepscope-0.1.0-firefox.zip'), 'utf8')).toBe('built firefox bytes');
		}
	});
});
