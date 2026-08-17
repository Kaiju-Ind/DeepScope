import type { TechnologyDefinition } from '@/lib/detection/types';

export const salonistTechnologyDefinition: TechnologyDefinition = {
	id: 'salonist',
	name: 'Salonist',
	website: 'https://salonist.io',
	description: 'Salonist is a salon management software.',
	icon: 'Salonist.png',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'salonist:dom:0',
			kind: 'dom',
			selector: "iframe[src*='.salonist.io/'], a[href*='.salonist.io/'][target='_blank']",
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
