import type { TechnologyDefinition } from '../../types';

export const loyolyTechnologyDefinition = {
	id: "loyoly",
	name: "Loyoly",
	website: "https://www.loyoly.io",
	description: "Loyoly is a loyalty and referral platform integrating user-generated content and reviews, enabling customer engagement with brands.",
	icon: "Loyoly.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "loyoly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.loyoly\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
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
