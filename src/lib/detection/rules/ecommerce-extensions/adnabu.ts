import type { TechnologyDefinition } from '../../types';

export const adnabuTechnologyDefinition = {
	id: "adnabu",
	name: "AdNabu",
	website: "https://www.adnabu.com",
	description: "AdNabu is a software solution for managing product feeds on Shopify, enabling organization and optimization for online stores.",
	icon: "AdNabu.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "adnabu:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/adnabu-shopify"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
