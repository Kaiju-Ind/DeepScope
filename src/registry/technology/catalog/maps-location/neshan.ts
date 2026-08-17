import type { TechnologyDefinition } from '@/lib/detection/types';

export const neshanTechnologyDefinition: TechnologyDefinition = {
	id: 'neshan',
	name: 'Neshan',
	website: 'https://neshan.org',
	description:
		'Neshan is an Iranian route-finding tool that provides users with navigation and mapping services for travel across the country.',
	icon: 'Neshan.svg',
	categories: [
		'maps-location',
	],
	rules: [
		{
			id: 'neshan:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('static\\.neshan\\.org'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
