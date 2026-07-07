import type { TechnologyDefinition } from '../../types';

export const rollupTechnologyDefinition = {
	id: 'rollup',
	name: 'rollup',
	website: 'https://rollupjs.org/',
	description:
		'A module bundler for JavaScript which compiles small pieces of code into something larger and more complex',
	categories: [
		'bundler',
	],
	rules: [
		{
			id: 'rollup:scriptContent:explicit-banner:0',
			kind: 'scriptContent',
			pattern: /var\s*\w+\s*=\s*\(function\s*\(exports\)\s*\{\s*['"]use strict['"]\s*;\s*\/\*\s*Rollup\s*[^*]*\*\//i,
			confidence: 75,
			description: 'Script content includes an explicit Rollup banner near the generated wrapper.',
		},
		{
			id: 'rollup:scriptContent:rollup-plugin-comment:1',
			kind: 'scriptContent',
			pattern: /createCommonjsModule\s*\(\s*function\s*\(module,\s*exports\)\s*\{\s*\/\*\s*@rollup\/\w+\s*\*\//,
			confidence: 75,
			description: 'Script content includes an explicit @rollup plugin marker.',
		},
		{
			id: 'rollup:scriptContent:rollup-plugin-version:2',
			kind: 'scriptContent',
			pattern: /\/\*\s*rollup-plugin-\w+\s*version:\s*['"][0-9.]+['"]\s*\*\//,
			confidence: 75,
			description: 'Script content includes a rollup-plugin version marker.',
		},
		{
			id: 'rollup:scriptContent:explicit-esmodule-banner:3',
			kind: 'scriptContent',
			pattern:
				/Object\.defineProperty\s*\(\s*exports,\s*['"]__esModule['"],\s*\{\s*value:\s*true\s*\}\s*\);\s*\/\*\s*Rollup\s*/,
			confidence: 75,
			description: 'Script content includes an explicit Rollup marker after the CommonJS ES module marker.',
		},
	],
} as const satisfies TechnologyDefinition;
