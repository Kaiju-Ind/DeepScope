import type { TechnologyDefinition } from '@/lib/detection/types';

export const crallTechnologyDefinition: TechnologyDefinition = {
	id: 'crall',
	name: 'Crall',
	website: 'https://crall.io/',
	description: 'Crall is a personalized shopping experience system.',
	icon: 'Crall.svg',
	categories: [
		'experimentation-optimization',
	],
	rules: [
		{
			id: 'crall:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('cdn\\.crall\\.io\\/w\\/widgets\\.js\\?v=([\\d.]+)'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'crall:jsGlobal:1',
			kind: 'jsGlobal',
			property: '_CrallConfig',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;
