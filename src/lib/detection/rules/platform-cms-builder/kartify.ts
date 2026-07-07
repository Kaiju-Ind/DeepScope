import type { TechnologyDefinition } from '../../types';

export const kartifyTechnologyDefinition = {
	id: "kartify",
	name: "Kartify",
	website: "https://www.gokartify.com",
	description: "Kartify is an ecommerce platform designed to support business growth through integrated tools for online selling and management.",
	icon: "Kartify.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kartify:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("sellup\\.herokuapp\\.com\\/kartifyjs\\/kartify\\.js"),
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
