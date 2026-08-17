import type { TechnologyDefinition } from '@/lib/detection/types';

export const alliTechnologyDefinition: TechnologyDefinition = {
	id: 'alli',
	name: 'Alli',
	website: 'https://www.alliai.com',
	description: 'Alli is artificial intelligence for search engine optimisation.',
	icon: 'Alli.png',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'alli:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.alliai\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'mid',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
