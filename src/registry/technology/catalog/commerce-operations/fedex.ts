import type { TechnologyDefinition } from '@/lib/detection/types';

export const fedexTechnologyDefinition: TechnologyDefinition = {
	id: 'fedex',
	name: 'FedEx',
	website: 'https://www.fedex.com',
	description:
		'FedEx is an American multinational company which focuses on transportation, ecommerce and business services.',
	icon: 'FedEx.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'fedex:text:0',
			kind: 'text',
			pattern: new RegExp('\\bFedEx\\b'),
			description: 'Page text contains a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
