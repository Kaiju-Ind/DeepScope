import type { TechnologyDefinition } from '@/lib/detection/types';

export const majinTechnologyDefinition: TechnologyDefinition = {
	id: 'majin',
	name: 'MAJIN',
	website: 'https://ma-jin.jp',
	description:
		'MAJIN reads the hearts and minds of each customer using real-world data to automate optimal marketing processes.',
	icon: 'MAJIN.png',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'majin:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'ma.Touch',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'high',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
