import type { TechnologyDefinition } from '@/lib/detection/types';

export const asendiaTechnologyDefinition: TechnologyDefinition = {
	id: 'asendia',
	name: 'Asendia',
	website: 'https://www.asendia.com',
	description: 'Asendia is an international mail joint venture of French La Poste and Swiss Post.',
	icon: 'Asendia.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'asendia:text:0',
			kind: 'text',
			pattern: new RegExp('\\bAsendia\\b'),
			description: 'Page text contains a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
