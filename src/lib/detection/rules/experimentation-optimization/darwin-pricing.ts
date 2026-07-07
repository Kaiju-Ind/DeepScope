import type { TechnologyDefinition } from '../../types';

export const darwinPricingTechnologyDefinition = {
	id: "darwin-pricing",
	name: "Darwin Pricing",
	website: "https://www.darwinpricing.com",
	description: "Darwin Pricing is a data science platform that applies dynamic pricing strategies by analyzing market conditions and customer behavior to optimize revenue and pricing decisions.",
	icon: "DarwinPriicing.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "darwin-pricing:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.darwinpricing\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
