import type { TechnologyDefinition } from '../../types';

export const limespotTechnologyDefinition = {
	id: "limespot",
	name: "LimeSpot",
	website: "https://www.limespot.com",
	description: "LimeSpot is an AI-powered personalisation platform for marketers and ecommerce professionals.",
	icon: "LimeSpot.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "limespot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.personalizer\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "limespot:jsGlobal:1",
			kind: "jsGlobal",
			property: "LimeSpot.CartItems",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "limespot:jsGlobal:2",
			kind: "jsGlobal",
			property: "LimeSpot.Recommendations",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
