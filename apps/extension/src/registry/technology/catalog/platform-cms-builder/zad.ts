import type { TechnologyDefinition } from '@/lib/detection/types';

export const zadTechnologyDefinition: TechnologyDefinition = {
	id: 'zad',
	name: 'Zad',
	website: 'https://zad.gg',
	description:
		'Zad is an ecommerce platform designed to enable setup and management of secure online stores for businesses and entrepreneurs.',
	icon: 'Zad.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'zad:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('zad\\.nyc3\\.digitaloceanspaces'),
			description: 'Script content contains a bounded technology signature.',
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
