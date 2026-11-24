import type { TechnologyDefinition } from '@/lib/detection/types';

export const amdTechnologyDefinition: TechnologyDefinition = {
	id: 'amd',
	name: 'AMD',
	website: 'https://en.wikipedia.org/wiki/Asynchronous_module_definition',
	description:
		'Asynchronous Module Definition (AMD) is a JavaScript API for defining modules such that the module and its dependencies can be asynchronously loaded.',
	categories: [
		'module-format',
	],
	rules: [
		{
			id: 'amd:scriptContent:modern:0',
			kind: 'scriptContent',
			pattern: new RegExp('(?<![\\w$.])define\\s*\\(\\s*["\'][^"\']+["\']\\s*,\\s*\\['),
			confidence: 70,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'amd:scriptContent:modern:1',
			kind: 'scriptContent',
			pattern: new RegExp('(?<![\\w$.])define\\s*\\(\\s*\\[[^\\]]*\\]\\s*,\\s*function'),
			confidence: 70,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'amd:scriptContent:modern:2',
			kind: 'scriptContent',
			pattern: new RegExp('(?<![\\w$.])define\\s*\\(\\s*function\\s*\\('),
			confidence: 70,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'amd:scriptContent:modern:3',
			kind: 'scriptContent',
			pattern: new RegExp(
				'define\\s*\\(\\s*\\[\\s*["\']require["\']\\s*,\\s*["\']exports["\']\\s*,\\s*["\']module["\']\\s*\\]',
			),
			confidence: 70,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'amd:scriptContent:modern:4',
			kind: 'scriptContent',
			pattern: new RegExp('(?<![\\w$.])define\\s*\\(\\s*\\[\\s*["\']exports["\']\\s*\\]'),
			confidence: 70,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'amd:scriptContent:modern:5',
			kind: 'scriptContent',
			pattern: new RegExp('(?<![\\w$.])define\\(["\'][^"\']+["\'],\\['),
			confidence: 40,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'amd:scriptContent:modern:6',
			kind: 'scriptContent',
			pattern: new RegExp('(?<![\\w$.])define\\(\\[[^\\]]*\\],function'),
			confidence: 70,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'amd:scriptContent:modern:7',
			kind: 'scriptContent',
			pattern: new RegExp('(?<![\\w$.])define\\(function\\('),
			confidence: 40,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'amd:scriptContent:modern:27',
			kind: 'scriptContent',
			pattern: new RegExp('(?<![\\w$.])define\\s*\\([^\\n;]{0,800}?[\'"]exports[\'"][^\\n;]{0,800}?function\\s*\\('),
			confidence: 5,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		// AMD loader markers must be explicit assignments, not feature checks for an optional environment.
		{
			id: 'amd:scriptContent:define-marker',
			kind: 'scriptContent',
			pattern: /(?<![\w$.])define\.amd\s*=\s*(?:\{|true\b)/,
			confidence: 90,
			description: 'Script explicitly assigns the AMD loader marker.',
		},
		{
			id: 'amd:scriptContent:require-marker',
			kind: 'scriptContent',
			pattern: /(?<![\w$.])require\.amd\s*=\s*(?:\{|true\b)/,
			confidence: 90,
			description: 'Script explicitly assigns the AMD loader marker.',
		},
	],
} as const satisfies TechnologyDefinition;
