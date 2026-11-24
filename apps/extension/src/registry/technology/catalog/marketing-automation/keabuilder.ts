import type { TechnologyDefinition } from '@/lib/detection/types';

export const keabuilderTechnologyDefinition: TechnologyDefinition = {
	id: 'keabuilder',
	name: 'KeaBuilder',
	website: 'https://keabuilder.com',
	description:
		'KeaBuilder is a platform that provides intelligent insights, strategic recommendations, advanced tools, and seamless integrations to strengthen online presence and support business growth.',
	icon: 'KeaBuilder.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'keabuilder:dom:0',
			kind: 'dom',
			selector: "link[href*='assets.keabuilder.com']",
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
