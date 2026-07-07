import type { TechnologyDefinition } from '../../types';

export const ternTechnologyDefinition = {
	id: "tern",
	name: "Tern",
	website: "https://www.tern.eco",
	description: "Tern is a plug and play ecommerce app, built for Shopify, that offers merchants the ability to provide a seamless trade-in service.",
	icon: "Tern.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "tern:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("live\\.tern-returns\\.eastsideapps\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
