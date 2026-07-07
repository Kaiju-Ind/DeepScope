import type { TechnologyDefinition } from '../../types';

export const beeswaxTechnologyDefinition = {
	id: "beeswax",
	name: "Beeswax",
	website: "https://www.beeswax.com/",
	description: "Beeswax offers Bidder-as-a-Service solution.",
	icon: "Beeswax.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "beeswax:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("segment\\.prod\\.bidr\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
