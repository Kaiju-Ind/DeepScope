import type { TechnologyDefinition } from '../../types';

export const esbuildTechnologyDefinition = {
	id: 'esbuild',
	name: 'esbuild',
	website: 'https://esbuild.github.io/',
	description: 'An extremely fast JavaScript bundler and minifier',
	categories: [
		'bundler',
		'minifier',
		'transpiler',
	],
	rules: [
		{
			id: 'esbuild:resourceUrl:explicit-file:0',
			kind: 'resourceUrl',
			pattern: /\.esbuild\.min\.js(?:[?#]|$)/,
			confidence: 90,
			description: 'Resource URL explicitly names an esbuild minified bundle.',
		},
		{
			id: 'esbuild:scriptContent:explicit-comment:1',
			kind: 'scriptContent',
			pattern: /\/\*\s*esbuild-[a-z]+\s*\*\//,
			confidence: 75,
			description: 'Script content includes an explicit esbuild marker comment.',
		},
		{
			id: 'esbuild:scriptContent:explicit-shims:2',
			kind: 'scriptContent',
			pattern: /esbuild_shims\s*=\s*\{[^}]+\}/,
			confidence: 75,
			description: 'Script content includes an explicit esbuild shim object.',
		},
		{
			id: 'esbuild:scriptContent:explicit-banner:3',
			kind: 'scriptContent',
			pattern: /\/\*\s*esbuild-banner\([^)]+\)\s*\*\//,
			confidence: 75,
			description: 'Script content includes an explicit esbuild banner marker.',
		},
		{
			id: 'esbuild:scriptContent:style-inject:4',
			kind: 'scriptContent',
			pattern: /__esbuild_style_inject\(/,
			confidence: 75,
			description: 'Script content includes esbuild style-injection helper output.',
		},
		{
			id: 'esbuild:scriptContent:css-inject:5',
			kind: 'scriptContent',
			pattern: /__esbuild_css_inject\(/,
			confidence: 75,
			description: 'Script content includes esbuild CSS-injection helper output.',
		},
		{
			id: 'esbuild:scriptContent:inject-style-tag:6',
			kind: 'scriptContent',
			pattern: /\.default\s*=\s*inject_style_tag\(/,
			confidence: 65,
			description: 'Script content includes esbuild-generated style tag injection output.',
		},
	],
} as const satisfies TechnologyDefinition;
