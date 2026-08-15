import type { TechnologyDefinition } from '../../types';

export const includableTechnologyDefinition: TechnologyDefinition = {
	id: 'includable',
	name: 'Includable',
	website: 'https://includable.com',
	icon: 'Includable.svg',
	categories: [
		'framework',
	],
	rules: [],
} as const satisfies TechnologyDefinition;
