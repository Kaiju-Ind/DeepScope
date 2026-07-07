import type { TechnologyDefinition } from '../../types';

export const civicTechnologyDefinition = {
	id: "civic",
	name: "CIVIC",
	website: "https://www.civicuk.com/cookie-control",
	description: "Civic provides cookie control for user consent and the use of cookies.",
	icon: "civic.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "civic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cc\\.cdn\\.civiccomputing\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
