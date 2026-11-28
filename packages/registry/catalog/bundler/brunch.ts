import type { TechnologyDefinition } from "../../types.ts";

export const brunchTechnologyDefinition: TechnologyDefinition = {
	id: 'brunch',
	name: 'Brunch',
	website: 'https://brunch.github.io/',
	description:
		'Brunch is an open-source JavaScript build tool for web applications with an opinionated build pipeline and plugin ecosystem.',
	categories: [
		'bundler',
	],
	rules: [
		{
			id: 'brunch:scriptContent:modern:0',
			kind: 'scriptContent',
			pattern: new RegExp('window\\.__brunch__'),
			confidence: 75,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'brunch:scriptContent:modern:1',
			kind: 'scriptContent',
			pattern: new RegExp('__brunch__'),
			confidence: 75,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'brunch:scriptContent:modern:2',
			kind: 'scriptContent',
			pattern: new RegExp('window\\.require\\.brunch'),
			confidence: 75,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'brunch:scriptContent:modern:3',
			kind: 'scriptContent',
			pattern: new RegExp('require\\.brunch\\s*='),
			confidence: 75,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'brunch:scriptContent:modern:4',
			kind: 'scriptContent',
			pattern: new RegExp('require\\.register\\s*\\('),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'brunch:scriptContent:modern:5',
			kind: 'scriptContent',
			pattern: new RegExp('require\\.modules\\s*='),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'brunch:scriptContent:modern:6',
			kind: 'scriptContent',
			pattern: new RegExp('require\\.registerFiles\\s*\\('),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'brunch:resourceUrl:modern:7',
			kind: 'resourceUrl',
			pattern: new RegExp('brunch-config\\.[jt]s$', 'i'),
			confidence: 55,
			description: 'Resource filename or URL matches a modern tooling marker.',
		},
		{
			id: 'brunch:resourceUrl:modern:8',
			kind: 'resourceUrl',
			pattern: new RegExp('\\.brunch\\/', 'i'),
			confidence: 55,
			description: 'Resource filename or URL matches a modern tooling marker.',
		},
	],
	versioning: {
		scheme: 'semver',
	},
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
