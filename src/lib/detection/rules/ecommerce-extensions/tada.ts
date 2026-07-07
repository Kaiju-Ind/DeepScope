import type { TechnologyDefinition } from '../../types';

export const tadaTechnologyDefinition = {
	id: "tada",
	name: "Tada",
	website: "https://trytada.com",
	description: "Tada offers interactive website popups that allow Shopify merchants to collect more emails and increase sales by engaging website visitors through gamification.",
	icon: "Tada.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "tada:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.trytada\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
