import type { TechnologyDefinition } from '@/lib/detection/types';

export const klookTechnologyDefinition: TechnologyDefinition = {
	id: 'klook',
	name: 'Klook',
	website: 'https://www.klook.com',
	description:
		'Klook is a travel affiliate system designed to connect users with various travel services and experiences.',
	icon: 'Klook.svg',
	categories: [
		'advertising-paid-media',
	],
	rules: [
		{
			id: 'klook:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.klook\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;
