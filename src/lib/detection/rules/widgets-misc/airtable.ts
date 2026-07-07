import type { TechnologyDefinition } from '../../types';

export const airtableTechnologyDefinition = {
	id: "airtable",
	name: "Airtable",
	website: "https://www.airtable.com",
	description: "Airtable is a low-code platform for building collaborative apps.",
	icon: "Airtable.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "airtable:dom:0",
			kind: "dom",
			selector: "iframe[src*='//airtable.com/'], a[href*='//airtable.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
