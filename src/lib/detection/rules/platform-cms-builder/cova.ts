import type { TechnologyDefinition } from '../../types';

export const covaTechnologyDefinition = {
	id: "cova",
	name: "Cova",
	website: "https://covasoftware.com",
	description: "Cova is a cannabis software platform that supports dispensary operations with point-of-sale, payments, inventory management, and regulatory compliance.",
	icon: "Cova.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cova:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^cova_last_url$", "i"),
			description: "Cookie name matches a known technology marker.",
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
