import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { callNames, importedNames, objectPropertyBooleanValues, parseSource, stringLiterals } from '@/tests/support/oxc';

const WXT_CONFIG = fileURLToPath(new URL('../../../wxt.config.ts', import.meta.url));

/** Get repository text used by the font-ownership architecture assertions. */
function get(relative: string): string {
	return readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8');
}

describe('side-panel font ownership', () => {
	it('lets Fontless own font emission instead of public runtime paths', () => {
		const config = parseSource(WXT_CONFIG);
		const styles = get('../../styles/app.css');
		const literals = stringLiterals(config);

		expect(importedNames(config, 'fontless')).toContain('fontless');
		expect(callNames(config)).toContain('fontless');
		expect(literals).toEqual(expect.arrayContaining([
			'./src/assets/fonts/american-kestrel/americankestral.ttf',
			'/assets/_fonts',
		]));
		expect(literals.some((value) => value.startsWith('/fonts/american-kestrel/'))).toBe(false);
		expect(styles).not.toContain('@font-face');
		expect(styles).toContain("--font-american-kestrel: 'American Kestrel';");
		expect(styles).toContain('--font-logo: var(--font-american-kestrel)');
		expect(existsSync(fileURLToPath(new URL('../../../public/fonts/american-kestrel', import.meta.url)))).toBe(false);
	});

	it('configures module and font preloads off before artifact validation', () => {
		const config = parseSource(WXT_CONFIG);

		expect(objectPropertyBooleanValues(config, 'modulePreload')).toEqual([false]);
		const fontPreloads = objectPropertyBooleanValues(config, 'preload');
		expect(fontPreloads.length).toBeGreaterThan(0);
		expect(fontPreloads.every((value) => value === false)).toBe(true);
	});

	it('keeps the Kaiju and DeepScope header treatment aligned with the website', () => {
		const shell = get('../../app/shell.tsx');

		expect(shell).toContain('font-logo');
		expect(shell).toContain('bg-kaiju-cyan/10');
		expect(shell).toContain('font-display text-lg font-semibold tracking-tight text-kaiju-cyan');
	});
});
