import type { TechnologyDefinition } from '@/lib/detection/types';

export const anglerAiTechnologyDefinition: TechnologyDefinition = {
	id: 'angler-ai',
	name: 'Angler AI',
	website: 'https://www.getangler.ai',
	description:
		'Angler AI is a platform that helps direct-to-consumer brands improve prospecting strategies and increase customer lifetime value through data-driven insights.',
	icon: 'Angler.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'angler-ai:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('static\\.getangler\\.ai'),
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
