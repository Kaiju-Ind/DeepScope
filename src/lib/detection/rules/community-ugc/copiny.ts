import type { TechnologyDefinition } from '../../types';

export const copinyTechnologyDefinition = {
	id: "copiny",
	name: "Copiny",
	website: "https://copiny.com",
	description: "Copiny is a Russian-based community support system.",
	icon: "Copiny.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "copiny:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.copiny\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
