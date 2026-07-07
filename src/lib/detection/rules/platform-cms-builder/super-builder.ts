import type { TechnologyDefinition } from '../../types';

export const superBuilderTechnologyDefinition = {
	id: "super-builder",
	name: "Super Builder",
	website: "https://super.so",
	description: "Super Builder is a new tool for creating sleek landing pages right in Notion.",
	icon: "Super Builder.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "super-builder:dom:0",
			kind: "dom",
			selector: "link[href*='super-static-assets.'], link[href*='super.so'], img[srcset*='super-static-assets.']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: false,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"next-js",
		"notion",
	],
} as const satisfies TechnologyDefinition;
