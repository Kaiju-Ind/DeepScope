import type { TechnologyDefinition } from '../../types';

export const rentcafeTechnologyDefinition = {
	id: "rentcafe",
	name: "RentCafe",
	website: "https://www.rentcafe.com",
	description: "RentCafe is a residential rent management platform.",
	icon: "RentCafe.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "rentcafe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.rentcafe\\.com\\/"),
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
} as const satisfies TechnologyDefinition;
