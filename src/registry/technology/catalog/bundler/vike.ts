import type { TechnologyDefinition } from '@/lib/detection/types';

export const vikeTechnologyDefinition: TechnologyDefinition = {
	id: 'vike',
	name: 'Vike',
	website: 'https://vike.dev',
	description:
		'Vike is an open-source full-stack web framework built on Vite with server rendering, static generation, and integrations for React, Vue, and Solid.',
	icon: 'Vike.svg',
	categories: [
		'bundler',
		'ui-library',
		'framework',
	],
	rules: [
		{
			id: 'vike:dom:0',
			kind: 'dom',
			selector: 'script#vike_pageContext',
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'vike:jsGlobal:1',
			kind: 'jsGlobal',
			property: '__vike',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	versioning: {
		scheme: 'semver',
	},
	metadata: {
		saas: false,
		oss: true,
	},
	implies: [
		'vite',
		'typescript',
	],
} as const satisfies TechnologyDefinition;
