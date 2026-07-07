import type { TechnologyDefinition } from '../../types';

export const shopaccinoTechnologyDefinition = {
	id: "shopaccino",
	name: "Shopaccino",
	website: "https://www.shopaccino.com",
	description: "Shopaccino is an ecommerce platform for building websites and mobile apps that support B2C and B2B sales.",
	icon: "Shopaccino.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopaccino:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.shopaccino\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "shopaccino:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.shopaccino.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
