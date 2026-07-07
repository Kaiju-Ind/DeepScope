import type { TechnologyDefinition } from '../../types';

export const worldshoppingTechnologyDefinition = {
	id: "worldshopping",
	name: "WorldShopping",
	website: "https://www.worldshopping.global/",
	description: "WorldShopping makes online purchases in Japan easier for international visitors.",
	icon: "worldshopping.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "worldshopping:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("checkout-api\\.worldshopping\\.jp\\/(v\\d+)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
