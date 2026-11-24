import type { TechnologyDefinition } from '@/lib/detection/types';

export const salecycleTechnologyDefinition: TechnologyDefinition = {
	id: 'salecycle',
	name: 'SaleCycle',
	website: 'https://www.salecycle.com',
	description: 'SaleCycle is an UK based global behavioral marketing firm.',
	icon: 'salecycle.svg',
	categories: [
		'experimentation-optimization',
	],
	rules: [
		{
			id: 'salecycle:dom:0',
			kind: 'dom',
			selector: "iframe[src*='.salecycle.com'][target='_self']",
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
