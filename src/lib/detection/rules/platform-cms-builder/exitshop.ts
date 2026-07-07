import type { TechnologyDefinition } from '../../types';

export const exitshopTechnologyDefinition = {
	id: "exitshop",
	name: "Exitshop",
	website: "https://www.exitshop.cz",
	description: "Exitshop is an ecommerce solution designed for managing and operating online stores.",
	icon: "Exitshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "exitshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.exitshop\\.cz"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
