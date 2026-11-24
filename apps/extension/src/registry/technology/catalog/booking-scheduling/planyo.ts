import type { TechnologyDefinition } from '@/lib/detection/types';

export const planyoTechnologyDefinition: TechnologyDefinition = {
	id: 'planyo',
	name: 'Planyo',
	website: 'https://www.planyo.com',
	description:
		'Planyo is a flexible reservation system designed to manage bookings for various services and resources across different industries.',
	icon: 'Planyo.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'planyo:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('www\\.planyo\\.com'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
			'low',
			'payg',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
