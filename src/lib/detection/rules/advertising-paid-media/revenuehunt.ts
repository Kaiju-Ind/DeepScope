import type { TechnologyDefinition } from '../../types';

export const revenuehuntTechnologyDefinition = {
	id: "revenuehunt",
	name: "RevenueHunt",
	website: "https://revenuehunt.com",
	description: "RevenueHunt is an affiliate marketing and advertising company specializing in paid surveys and cost per lead campaigns.",
	icon: "RevenueHunt.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "revenuehunt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("admin\\.revenuehunt\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
