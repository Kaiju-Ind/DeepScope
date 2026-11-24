import type { TechnologyDefinition } from '@/lib/detection/types';

export const powerboutiqueTechnologyDefinition: TechnologyDefinition = {
	id: 'powerboutique',
	name: 'Powerboutique',
	website: 'https://www.powerboutique.com/',
	icon: 'powerboutique.png',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'powerboutique:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('powerboutique'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
