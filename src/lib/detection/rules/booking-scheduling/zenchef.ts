import type { TechnologyDefinition } from '../../types';

export const zenchefTechnologyDefinition = {
	id: "zenchef",
	name: "Zenchef",
	website: "https://www.zenchef.com",
	description: "Zenchef is a restaurant management software solution that simplifies the customer restaurant experience.",
	icon: "Zenchef.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "zenchef:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.zenchef\\.com\\/"),
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
