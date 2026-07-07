import type { TechnologyDefinition } from '../../types';

export const cmofferTechnologyDefinition = {
	id: "cmoffer",
	name: "CMoffer",
	website: "https://www.cmoffer.com",
	description: "CMoffer is a drop shipping app focused on necklaces, rings, bracelets, earrings, and other creative gifts.",
	icon: "CMoffer.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cmoffer:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.cmoffer\\.com"),
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
