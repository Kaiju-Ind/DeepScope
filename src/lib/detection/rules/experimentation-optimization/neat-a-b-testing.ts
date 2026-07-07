import type { TechnologyDefinition } from '../../types';

export const neatABTestingTechnologyDefinition = {
	id: "neat-a-b-testing",
	name: "Neat A/B testing",
	website: "https://neatab.com",
	description: "Neat A/B Testing is a Shopify app built by NeatShift.",
	icon: "Neat.png",
	categories: [
		"experimentation-optimization",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "neat-a-b-testing:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.neatab\\.com\\/"),
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
