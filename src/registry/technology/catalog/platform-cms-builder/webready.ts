import type { TechnologyDefinition } from '@/lib/detection/types';

export const webreadyTechnologyDefinition: TechnologyDefinition = {
	id: 'webready',
	name: 'Webready',
	website: 'https://usewebready.com',
	description: 'Webready is a platform that enables users to create custom vacation rental websites.',
	icon: 'Webready.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'webready:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'Webready',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'mid',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
