import type { TechnologyDefinition } from '@/lib/detection/types';

export const citymailTechnologyDefinition: TechnologyDefinition = {
	id: 'citymail',
	name: 'CityMail',
	website: 'https://www.citymail.se',
	description: 'CityMail is a private postal organisation operating in Sweden.',
	icon: 'CityMail.png',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'citymail:text:0',
			kind: 'text',
			pattern: new RegExp('\\bCitymail\\b'),
			description: 'Page text contains a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
