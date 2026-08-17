import type { TechnologyDefinition } from '@/lib/detection/types';

export const bookingFactoryTechnologyDefinition: TechnologyDefinition = {
	id: 'booking-factory',
	name: 'Booking Factory',
	website: 'https://bookingfactory.io',
	description:
		'Booking Factory is an all-in-one hotel management system that facilitates management of hotel operations.',
	icon: 'BookingFactory.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'booking-factory:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('app\\.thebookingbutton\\.com'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;
