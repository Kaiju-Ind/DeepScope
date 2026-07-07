import type { TechnologyDefinition } from '../../types';

export const hullTechnologyDefinition = {
	id: "hull",
	name: "Hull",
	website: "https://www.hull.io",
	description: "Hull is a platform that collects, unifies, enriches product, marketing, and sales data, then synchronizes it across various tools.",
	icon: "Hull.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "hull:jsGlobal:0",
			kind: "jsGlobal",
			property: "Hull._initialized",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hull:jsGlobal:1",
			kind: "jsGlobal",
			property: "Hull.js._initialized",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hull:jsGlobal:2",
			kind: "jsGlobal",
			property: "HullShopify",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
