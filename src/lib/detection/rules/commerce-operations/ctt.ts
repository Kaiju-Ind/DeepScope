import type { TechnologyDefinition } from '../../types';

export const cttTechnologyDefinition: TechnologyDefinition = {
	id: 'ctt',
	name: 'CTT',
	website: 'https://www.ctt.pt',
	description: 'CTT operates as the national postal service of Portugal.',
	icon: 'CTT.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'ctt:text:0',
			kind: 'text',
			pattern: new RegExp('\\bTourline Express\\b'),
			description: 'Page text contains a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
