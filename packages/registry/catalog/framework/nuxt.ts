import type { TechnologyDefinition } from "../../types.ts";

/**
 * Second source fragment for `nuxt-js`. It was a separate `nuxt` id, so one
 * product was reported twice; the registry merges fragments that share an id.
 */
export const nuxtTechnologyDefinition: TechnologyDefinition = {
	id: 'nuxt-js',
	name: 'Nuxt',
	website: 'https://nuxt.com/',
	description: 'Nuxt is an open-source full-stack Vue framework for building production web applications and websites.',
	icon: 'Nuxt.svg',
	categories: [
		'framework',
	],
	rules: [
		{
			id: 'nuxt-js:header:gap0',
			kind: 'header',
			key: 'x-powered-by',
			valuePattern: new RegExp('^Nuxt$'),
			description: 'Capture Nuxt response header.',
		},
		{
			id: 'nuxt-js:scriptContent:modern:0',
			kind: 'scriptContent',
			pattern: new RegExp('$nuxt'),
			confidence: 75,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'nuxt-js:scriptContent:modern:1',
			kind: 'scriptContent',
			pattern: new RegExp('\\$nuxt\\.'),
			confidence: 75,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'nuxt-js:scriptContent:modern:2',
			kind: 'scriptContent',
			pattern: new RegExp('_nuxt\\/'),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'nuxt-js:scriptContent:modern:3',
			kind: 'scriptContent',
			pattern: new RegExp('__NUXT_STATE__'),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'nuxt-js:scriptContent:modern:4',
			kind: 'scriptContent',
			pattern: new RegExp('__NUXT_LOADED__'),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'nuxt-js:scriptContent:modern:5',
			kind: 'scriptContent',
			pattern: new RegExp('__NUXT_ERROR__'),
			confidence: 65,
			description: 'Bundled script content matches a modern tooling marker.',
		},
		{
			id: 'nuxt-js:resourceUrl:modern:6',
			kind: 'resourceUrl',
			pattern: new RegExp('\\.nuxt\\/'),
			confidence: 65,
			description: 'Resource filename or URL matches a modern tooling marker.',
		},
		{
			id: 'nuxt-js:resourceUrl:modern:7',
			kind: 'resourceUrl',
			pattern: new RegExp('_nuxt\\/'),
			confidence: 65,
			description: 'Resource filename or URL matches a modern tooling marker.',
		},
		{
			id: 'nuxt-js:resourceUrl:modern:8',
			kind: 'resourceUrl',
			pattern: new RegExp('\\/_nuxt\\/'),
			confidence: 65,
			description: 'Resource filename or URL matches a modern tooling marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
