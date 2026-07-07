import type { TechnologyDefinition } from '../../types';

export const glopalTechnologyDefinition = {
	id: "glopal",
	name: "Glopal",
	website: "https://www.glopal.com",
	description: "Glopal provides advanced international marketing solutions for ecommerce retailers and brands seeking to grow their businesses' globally.",
	icon: "Glopal.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "glopal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.glopal\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
