import type { TechnologyDefinition } from '../../types';

export const mrwTechnologyDefinition: TechnologyDefinition = {
	id: 'mrw',
	name: 'MRW',
	website: 'https://www.mrw.es',
	description: 'MRW is a Spanish courier company specialised in express national and international shipping services.',
	icon: 'MRW.png',
	categories: [
		'commerce-operations',
	],
	rules: [],
} as const satisfies TechnologyDefinition;
