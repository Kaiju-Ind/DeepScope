import type { TechnologyDefinition } from '../../types';

export const kiboCommerceTechnologyDefinition = {
	id: "kibo-commerce",
	name: "Kibo Commerce",
	website: "https://kibocommerce.com",
	description: "Kibo Commerce is a enterprise ecommerce platform  that offers a cloud-based, end-to-end commerce solution for retailers and branded manufacturers.",
	icon: "Kibo.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kibo-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-tp\\d+\\.mozu\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
