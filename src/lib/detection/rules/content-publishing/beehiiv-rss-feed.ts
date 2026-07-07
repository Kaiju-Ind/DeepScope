import type { TechnologyDefinition } from '../../types';

export const beehiivRssFeedTechnologyDefinition = {
	id: "beehiiv-rss-feed",
	name: "Beehiiv RSS feed",
	website: "https://www.beehiiv.com",
	description: "Beehiiv RSS feed is a feature of the Beehiiv. Beehiiv is a relatively young, hosted newsletter platform built for businesses and creators.",
	icon: "Beehiiv.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "beehiiv-rss-feed:dom:0",
			kind: "dom",
			selector: "iframe[src*='embeds.beehiiv.com/']",
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
