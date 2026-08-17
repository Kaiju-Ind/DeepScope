import type { TechnologyDefinition } from '@/lib/detection/types';

export const sliceTechnologyDefinition: TechnologyDefinition = {
	id: 'slice',
	name: 'Slice',
	website: 'https://slicelife.com/owners',
	description: 'Slice is an online food ordering platform for independent pizzerias.',
	icon: 'Slice.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'slice:dom:0',
			kind: 'dom',
			selector: "a[href*='slicelife.com/restaurants/']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'payg',
		],
	},
} as const satisfies TechnologyDefinition;
