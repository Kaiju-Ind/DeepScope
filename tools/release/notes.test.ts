import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { workspace } from './fixture.ts';

describe('release version and notes', () => {
	it.each(['0.1.0', 'v0.1.0', 'refs/tags/v0.1.0'])('accepts the exact package version as %s', (tag) => {
		const fixture = workspace();
		expect(fixture.command(['check-version', tag]).status).toBe(0);
	});

	it('rejects a different tag', () => {
		const fixture = workspace();
		const result = fixture.command(['check-version', 'v0.2.0']);
		expect(result.status).toBe(1);
		expect(result.stderr).toContain('does not match');
	});

	it.each(['0.1.0', '0.1.0-beta.1', '0.1.0+build.1'])('selects only the complete literal version %s', (version) => {
		const fixture = workspace();
		const changelog = [
			'## [0.1.0+build.1] - 2026-11-28', '', 'Build notes.', '',
			'## v0.1.0-beta.1', '', 'Prerelease notes.', '',
			'## [0.1.0]', '', 'Stable notes.', '',
		].join('\n');
		writeFileSync(join(fixture.checkout, 'CHANGELOG.md'), changelog);
		const out = join(fixture.root, 'notes.md');
		const result = fixture.command(['notes', version, out]);
		expect(result.status, result.stderr).toBe(0);
		const expected = version.includes('+') ? 'Build notes.' : version.includes('-') ? 'Prerelease notes.' : 'Stable notes.';
		expect(readFileSync(out, 'utf8')).toBe(`${expected}\n`);
	});

	it.each([undefined, '## 0.2.0\n\nOther version.\n', '## 0.1.0\n\n## 0.0.1\n\nOlder.\n'])(
		'returns the generated-notes fallback status when the section is absent or empty', (changelog) => {
			const fixture = workspace();
			if (changelog !== undefined) writeFileSync(join(fixture.checkout, 'CHANGELOG.md'), changelog);
			const out = join(fixture.root, 'notes.md');
			expect(fixture.command(['notes', '0.1.0', out]).status).toBe(3);
			expect(existsSync(out)).toBe(false);
		},
	);
});
