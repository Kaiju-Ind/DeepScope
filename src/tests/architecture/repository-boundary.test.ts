import { readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { describe, expect, it } from 'vitest';

const ROOTS = ['src', 'modules'] as const;
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json']);
const FORBIDDEN_SOURCE_REFERENCES = [
	'../Collectors/',
	'../Intelligence/',
	'github.com/Kaiju-Ind/Collectors',
	'github.com/Kaiju-Ind/Intelligence',
] as const;

function files(root: string): string[] {
	const found: string[] = [];
	for (const entry of readdirSync(root, { withFileTypes: true })) {
		const path = join(root, entry.name);
		if (entry.isDirectory()) {
			if (path === join('src', 'tests')) continue;
			found.push(...files(path));
			continue;
		}
		if (entry.isFile() && EXTENSIONS.has(extname(path))) found.push(path);
	}
	return found;
}

describe('repository boundary', () => {
	it('does not source-import Collectors or future Intelligence', () => {
		const violations: string[] = [];
		for (const root of ROOTS) {
			for (const path of files(root)) {
				const source = readFileSync(path, 'utf8');
				for (const token of FORBIDDEN_SOURCE_REFERENCES) {
					if (source.includes(token)) violations.push(`${path}: ${token}`);
				}
			}
		}
		expect(violations).toEqual([]);
	});
});
