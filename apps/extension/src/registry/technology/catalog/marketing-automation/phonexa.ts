import type { TechnologyDefinition } from '@/lib/detection/types';

export const phonexaTechnologyDefinition: TechnologyDefinition = {
	id: 'phonexa',
	name: 'Phonexa',
	website: 'https://phonexa.com',
	description: 'Phonexa is a platform that helps optimise web lead, call lead, and email marketing campaigns.',
	icon: 'Phonexa.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'phonexa:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.phonexa\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'mid',
			'poa',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
