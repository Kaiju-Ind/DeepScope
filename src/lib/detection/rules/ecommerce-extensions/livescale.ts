import type { TechnologyDefinition } from '../../types';

export const livescaleTechnologyDefinition = {
	id: "livescale",
	name: "Livescale",
	website: "https://www.livescale.tv",
	description: "Livescale is a video platform that enables teams to transform content and ecommerce into a live shopping experience that reaches engages and monetizes audiences with LiveShopping.",
	icon: "Livescale.png",
	categories: [
		"ecommerce-extensions",
		"media-video",
	],
	rules: [
		{
			id: "livescale:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.livescale\\.tv\\/"),
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
