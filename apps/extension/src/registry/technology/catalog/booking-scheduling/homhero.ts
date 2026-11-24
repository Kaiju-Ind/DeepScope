import type { TechnologyDefinition } from '@/lib/detection/types';

export const homheroTechnologyDefinition: TechnologyDefinition = {
	id: 'homhero',
	name: 'HomHero',
	website: 'https://homhero.com.au',
	description:
		'Homhero is a platform that offers a range of tools and services to help vacation rental owners manage their properties and bookings.',
	icon: 'HomHero.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'homhero:dom:0',
			kind: 'dom',
			selector: 'script#homhero-scripts-js',
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;
