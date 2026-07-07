import type { TechnologyDefinition } from '../../types';

export const furnituredealerTechnologyDefinition = {
	id: "furnituredealer",
	name: "FurnitureDealer",
	website: "https://www.furnituredealer.net",
	description: "FurnitureDealer is the internet partner of more than 100 leading local full service brick and mortar furniture retailers.",
	icon: "FurnitureDealer.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "furnituredealer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.furnituredealer\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
