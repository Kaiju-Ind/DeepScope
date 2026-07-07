import type { TechnologyDefinition } from '../../types';

export const mshopTechnologyDefinition = {
	id: "mshop",
	name: "MSHOP",
	website: "https://hotishop.com",
	description: "MSHOP is an all-in-one ecommerce platform.",
	icon: "MSHOP.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.hotishop\\.com\\/"),
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
