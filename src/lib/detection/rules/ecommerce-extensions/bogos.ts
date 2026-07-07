import type { TechnologyDefinition } from '../../types';

export const bogosTechnologyDefinition = {
	id: "bogos",
	name: "Bogos",
	website: "https://bogos.io",
	description: "Bogos is a Shopify app for free gift promotions, enabling sales growth through offers such as Buy X Get Y and other customizable promotional campaigns.",
	icon: "Bogos.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "bogos:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("collect\\.bogos\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
