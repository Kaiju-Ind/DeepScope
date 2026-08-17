import type { TechnologyDefinition } from '@/lib/detection/types';

export const beehiivTechnologyDefinition: TechnologyDefinition = {
	id: 'beehiiv',
	name: 'Beehiiv',
	website: 'https://www.beehiiv.com',
	description: 'Beehiiv is a relatively young, hosted newsletter platform built for businesses and creators.',
	icon: 'Beehiiv.svg',
	categories: [
		'content-publishing',
	],
	rules: [
		{
			id: 'beehiiv:dom:0',
			kind: 'dom',
			selector: "link[href*='media.beehiiv.com/']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
