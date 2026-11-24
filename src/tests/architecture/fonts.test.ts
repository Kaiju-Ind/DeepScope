import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

/**
 * Release archives must rebuild byte-for-byte without network access, so every
 * font file has to come from the repository or an exact-pinned npm package.
 */
const ROOT = fileURLToPath(new URL('../../../', import.meta.url));
const css = readFileSync(`${ROOT}src/styles/fonts.css`, 'utf8');
const pkg = JSON.parse(readFileSync(`${ROOT}package.json`, 'utf8')) as {
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
};
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
const urls = [...css.matchAll(/url\('([^']+)'\)/gu)].map((match) => match[1]!);

describe('UI fonts', () => {
	it('loads every face from a local file or an exact-pinned package', () => {
		expect(urls.length).toBeGreaterThan(0);
		for (const url of urls) {
			if (url.startsWith('../')) {
				expect(existsSync(fileURLToPath(new URL(url, `file://${ROOT}src/styles/`))), url).toBe(true);
				continue;
			}
			const name = url.split('/').slice(0, 2).join('/');
			expect(deps[name], url).toMatch(/^\d+\.\d+\.\d+$/u);
		}
	});

	it('ships only woff2 for web fonts (TTF only for the local logo face)', () => {
		for (const url of urls) expect(url, url).toMatch(/\.woff2$|americankestral\.ttf$/u);
	});

	it('does not use a build-time font downloader', () => {
		expect(deps).not.toHaveProperty('fontless');
		expect(readFileSync(`${ROOT}wxt.config.ts`, 'utf8')).not.toMatch(/fontless/u);
	});
});
