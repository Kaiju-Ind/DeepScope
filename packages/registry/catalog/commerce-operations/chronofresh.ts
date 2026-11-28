import type { TechnologyDefinition } from "../../types.ts";

export const chronofreshTechnologyDefinition: TechnologyDefinition = {
	id: 'chronofresh',
	name: 'Chronofresh',
	website: 'https://www.chronofresh.fr',
	description: 'Chronofresh is an express transport service for food products.',
	icon: 'Chronopost.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'chronofresh:text:0',
			kind: 'text',
			pattern: new RegExp('\\bChronofresh\\b'),
			description: 'Page text contains a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
