import type { TechnologyDefinition } from '@/lib/detection/types';

export const omnikickTechnologyDefinition: TechnologyDefinition = {
	id: 'omnikick',
	name: 'Omnikick',
	website: 'https://www.omnikick.com',
	description:
		'Omnikick is a platform designed to help businesses engage, convert, and grow their customer base through targeted digital marketing strategies.',
	icon: 'Omnikick.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'omnikick:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'omniKick.ready',
			description: 'Page-owned global matches a known technology marker.',
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
