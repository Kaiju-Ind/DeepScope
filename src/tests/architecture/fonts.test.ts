import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

/** Get repository text used by the font-ownership architecture assertions. */
function get(relative: string): string {
	return readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8');
}

describe('side-panel font ownership', () => {
	it('lets Fontless own emitted font assets instead of public runtime paths', () => {
		const config = get('../../../wxt.config.ts');
		const styles = get('../../styles/app.css');

		expect(config).toContain("import { fontless } from 'fontless';");
		expect(config).toContain("./src/assets/fonts/american-kestrel/americankestral.ttf");
		expect(config).toContain("assets: { prefix: '/assets/_fonts' }");
		expect(config).not.toContain("'/fonts/american-kestrel/");
		expect(styles).not.toContain('@font-face');
		expect(styles).toContain("--font-american-kestrel: 'American Kestrel';");
		expect(styles).toContain('--font-logo: var(--font-american-kestrel)');
		expect(existsSync(fileURLToPath(new URL('../../../public/fonts/american-kestrel', import.meta.url)))).toBe(false);
	});

	it('does not generate eager module or font preloads for extension pages', () => {
		const config = get('../../../wxt.config.ts');

		expect(config).toContain('modulePreload: false');
		expect(config).toContain('preload: false');
		expect(config).not.toContain('preload: true');
	});

	it('keeps the Kaiju and DeepScope header treatment aligned with the website', () => {
		const shell = get('../../app/shell.tsx');

		expect(shell).toContain('font-logo');
		expect(shell).toContain('bg-kaiju-cyan/10');
		expect(shell).toContain('font-display text-lg font-semibold tracking-tight text-kaiju-cyan');
	});
});
