import type { TechnologyDefinition } from '../../types';

export const musictodayTechnologyDefinition = {
	id: "musictoday",
	name: "Musictoday",
	website: "https://www.musictoday.com",
	description: "Musictoday is a provider of ecommerce solutions that supports brands with online storefronts, digital sales operations, and related services for managing and selling products online.",
	icon: "Musictoday.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "musictoday:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.musictoday\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
