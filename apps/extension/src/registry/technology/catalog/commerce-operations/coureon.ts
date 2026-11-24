import type { TechnologyDefinition } from '@/lib/detection/types';

export const coureonTechnologyDefinition: TechnologyDefinition = {
	id: 'coureon',
	name: 'Coureon',
	website: 'https://www.coureon.com',
	description: 'Coureon is a digital logistics carrier for international shipping.',
	icon: 'Coureon.png',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'coureon:text:0',
			kind: 'text',
			pattern: new RegExp('\\bCoureon\\b'),
			description: 'Page text contains a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
