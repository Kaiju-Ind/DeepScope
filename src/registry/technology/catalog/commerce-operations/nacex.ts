import type { TechnologyDefinition } from '@/lib/detection/types';

export const nacexTechnologyDefinition: TechnologyDefinition = {
	id: 'nacex',
	name: 'NACEX',
	website: 'https://www.nacex.es',
	description: 'NACEX is an express courier company in Spain, Andorra and Portugal.',
	icon: 'NACEX.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'nacex:text:0',
			kind: 'text',
			pattern: new RegExp('\\bNACEX\\b'),
			description: 'Page text contains a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
