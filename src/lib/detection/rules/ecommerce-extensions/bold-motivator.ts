import type { TechnologyDefinition } from '../../types';

export const boldMotivatorTechnologyDefinition = {
	id: "bold-motivator",
	name: "Bold Motivator",
	website: "https://boldcommerce.com/motivator",
	description: "Bold Motivator motivate customers to spend more on your store with free shipping and gifts using a customisable banner that counts down how much more they have to buy.",
	icon: "Bold.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "bold-motivator:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("motivate\\.boldapps\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"bold-commerce",
		"shopify",
	],
} as const satisfies TechnologyDefinition;
