import type { TechnologyDefinition } from '../../types';

export const versaCommerceTechnologyDefinition = {
	id: "versa-commerce",
	name: "Versa Commerce",
	website: "https://www.versacommerce.de",
	description: "Versa Commerce is an online shop and point of sale (POS) system from Germany.",
	icon: "VersaCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "versa-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.versacommerce\\.de\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "versa-commerce:dom:1",
			kind: "dom",
			selector: "link[href*='.versacommerce.de/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
