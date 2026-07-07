import type { TechnologyDefinition } from '../../types';

export const platterTechnologyDefinition = {
	id: "platter",
	name: "Platter",
	website: "https://www.platter.co",
	description: "Platter is a platform that provides integrated themes and apps for Shopify stores, allowing for efficient customization.",
	icon: "Platter.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "platter:dom:0",
			kind: "dom",
			selector: "link[href*='/platter.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
