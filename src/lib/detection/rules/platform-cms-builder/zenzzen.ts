import type { TechnologyDefinition } from '../../types';

export const zenzzenTechnologyDefinition = {
	id: "zenzzen",
	name: "Zenzzen",
	website: "https://zenzzen.com",
	description: "Zenzzen is an ecommerce platform enabling businesses to build fully customizable online stores under their own brand, providing flexibility in managing products, processing payments, and enhancing the customer experience.",
	icon: "Zenzzen.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zenzzen:dom:0",
			kind: "dom",
			selector: "span[class*='zenzzen-store']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
