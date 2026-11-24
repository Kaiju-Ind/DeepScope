import type { TechnologyDefinition } from '@/lib/detection/types';

export const siwebTechnologyDefinition: TechnologyDefinition = {
	id: 'siweb',
	name: 'Siweb',
	website: 'https://siweb.es',
	description: 'Siweb is an AI-based website builder from Spain.',
	icon: 'Siweb.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'siweb:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'webpackChunksiweb2',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
