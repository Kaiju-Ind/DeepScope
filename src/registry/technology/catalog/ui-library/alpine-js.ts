import type { TechnologyDefinition } from '@/lib/detection/types';

export const alpineJsTechnologyDefinition: TechnologyDefinition = {
	id: 'alpine-js',
	name: 'Alpine.js',
	website: 'https://alpinejs.dev/',
	description: 'Alpine.js is a lightweight JavaScript framework for composing behavior directly in HTML markup.',
	icon: 'Alpine.js.svg',
	categories: [
		'ui-library',
	],
	rules: [
		{
			id: 'alpine-js:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/alpine(?:\\.min)?\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'alpine-js:html:1',
			kind: 'html',
			pattern: new RegExp('<[^<>]+[^\\w-]x-data[^\\w-][^<]+'),
			confidence: 75,
			description: 'HTML contains a known technology signature.',
		},
		{
			id: 'alpine-js:jsGlobal:2',
			kind: 'jsGlobal',
			property: 'Alpine.version',
			valuePattern: new RegExp('^(.+)$'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'alpine-js:jsGlobal:3',
			kind: 'jsGlobal',
			property: 'Alpine',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'alpine-js:jsGlobal:4',
			kind: 'jsGlobal',
			property: 'deferLoadingAlpine',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
