import type { TechnologyDefinition } from '@/lib/detection/types';

export const supademoTechnologyDefinition: TechnologyDefinition = {
	id: 'supademo',
	name: 'Supademo',
	website: 'https://supademo.com',
	description:
		'Supademo is a widget-based tool for creating interactive product demos that can be embedded into websites or shared via links.',
	icon: 'Supademo.svg',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'supademo:dom:0',
			kind: 'dom',
			selector: "iframe[src*='supademo']",
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
