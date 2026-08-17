import type { TechnologyDefinition } from '@/lib/detection/types';

export const campflowTechnologyDefinition: TechnologyDefinition = {
	id: 'campflow',
	name: 'Campflow',
	website: 'https://www.campflow.de',
	description:
		'Campflow is a SaaS platform for event and membership management that provides online registration forms, participant tracking, communication tools, and financial reporting.',
	icon: 'Campflow.svg',
	categories: [
		'surveys-feedback',
	],
	rules: [
		{
			id: 'campflow:dom:0',
			kind: 'dom',
			selector: "iframe[src*='on.campflow.de/']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
