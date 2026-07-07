import type { TechnologyDefinition } from '../../types';

export const zipifyOcuTechnologyDefinition = {
	id: "zipify-ocu",
	name: "Zipify OCU",
	website: "https://zipify.com/apps/ocu/",
	description: "Zipify OCU allows you to add upsells and cross-sells to your checkout sequence.",
	icon: "Zipify OCU.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "zipify-ocu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/zipify-oneclickupsell-vendor\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
