import type { TechnologyDefinition } from "../../types.ts";

export const ecoviumTechnologyDefinition: TechnologyDefinition = {
	id: 'ecovium',
	name: 'Ecovium',
	website: 'https://ecovium.com',
	description: 'Ecovium is an end-to-end logistics company in Germany.',
	icon: 'Ecovium.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'ecovium:text:1',
			kind: 'text',
			pattern: new RegExp('\\bEcovium\\b'),
			description: 'Page text contains a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
