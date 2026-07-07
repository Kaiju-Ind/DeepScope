import type { TechnologyDefinition } from '../../types';

export const targetbayTechnologyDefinition = {
	id: "targetbay",
	name: "TargetBay",
	website: "https://targetbay.com",
	description: "TargetBay is an all-in-one ecommerce marketing platform.",
	icon: "TargetBay.svg",
	categories: [
		"platform-cms-builder",
		"marketing-automation",
	],
	rules: [
		{
			id: "targetbay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.targetbay\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
