import type { TechnologyDefinition } from '@/lib/detection/types';

export const trunkrsTechnologyDefinition: TechnologyDefinition = {
	id: 'trunkrs',
	name: 'Trunkrs',
	website: 'https://trunkrs.nl',
	description: 'Trunkrs is a Dutch parcel delivery service.',
	icon: 'Trunkrs.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'trunkrs:text:0',
			kind: 'text',
			pattern: new RegExp('\\bTrunkrs\\b'),
			description: 'Page text contains a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
