import type { TechnologyDefinition } from '@/lib/detection/types';

export const fleksaTechnologyDefinition: TechnologyDefinition = {
	id: 'fleksa',
	name: 'Fleksa',
	website: 'https://fleksa.com',
	description: 'Fleksa is an online ordering system for restaurants and delivery.',
	icon: 'Fleksa.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'fleksa:dom:0',
			kind: 'dom',
			selector: "a[href*='play.google.com/store/apps/details?id=com.fleksa.'][target='_blank']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'mid',
			'payg',
			'recurring',
		],
	},
	implies: [
		'next-js',
		'node-js',
	],
} as const satisfies TechnologyDefinition;
