import type { TechnologyDefinition } from '@/lib/detection/types';

export const easylingTechnologyDefinition: TechnologyDefinition = {
	id: 'easyling',
	name: 'Easyling',
	website: 'https://www.easyling.com',
	description:
		'Easyling is a website translation solution that provides tools for localizing websites through multiple methods.',
	icon: 'Easyling.svg',
	categories: [
		'translations',
	],
	rules: [
		{
			id: 'easyling:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('app\\.easyling\\.com'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'low',
			'poa',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
