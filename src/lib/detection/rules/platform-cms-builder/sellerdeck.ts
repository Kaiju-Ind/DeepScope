import type { TechnologyDefinition } from '../../types';

export const sellerdeckTechnologyDefinition = {
	id: "sellerdeck",
	name: "Sellerdeck",
	website: "https://www.sellerdeck.co.uk",
	description: "Sellerdeck is a SEO-friendly ecommerce solution, formerly known as Actinic.",
	icon: "Sellerdeck.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sellerdeck:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sellerdeck\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
