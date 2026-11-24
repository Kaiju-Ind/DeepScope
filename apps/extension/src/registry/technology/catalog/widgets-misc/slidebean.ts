import type { TechnologyDefinition } from '@/lib/detection/types';

export const slidebeanTechnologyDefinition: TechnologyDefinition = {
	id: 'slidebean',
	name: 'Slidebean',
	website: 'https://slidebean.com',
	description:
		'Slidebean is an all-in-one pitch deck software designed to streamline the creation, design, and presentation of business pitches.',
	icon: 'Slidebean.svg',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'slidebean:dom:0',
			kind: 'dom',
			selector: "iframe[src*='.slidebean.com/']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
