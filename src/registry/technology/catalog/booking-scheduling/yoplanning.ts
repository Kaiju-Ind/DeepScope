import type { TechnologyDefinition } from '@/lib/detection/types';

export const yoplanningTechnologyDefinition: TechnologyDefinition = {
	id: 'yoplanning',
	name: 'YoPlanning',
	website: 'https://yoplanning.pro',
	description: 'YoPlanning is an online software designed for booking and planning activities.',
	icon: 'YoPlanning.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'yoplanning:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('booking\\.yoplanning\\.pro'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
