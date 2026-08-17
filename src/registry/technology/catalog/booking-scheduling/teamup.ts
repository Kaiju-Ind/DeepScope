import type { TechnologyDefinition } from '@/lib/detection/types';

export const teamupTechnologyDefinition: TechnologyDefinition = {
	id: 'teamup',
	name: 'TeamUp',
	website: 'https://goteamup.com',
	description: 'TeamUp is fitness management software catering to boutique gyms, studios, and fitness boxes worldwide.',
	icon: 'TeamUp.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'teamup:dom:0',
			kind: 'dom',
			selector: "a[href*='//goteamup.com/']",
			description: 'DOM selector matches a known technology marker.',
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
