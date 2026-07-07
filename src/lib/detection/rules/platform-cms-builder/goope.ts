import type { TechnologyDefinition } from '../../types';

export const goopeTechnologyDefinition = {
	id: "goope",
	name: "Goope",
	website: "https://goope.jp",
	description: "Goope is a Japanese homepage design system that provides tools for creating and managing websites.",
	icon: "Goope.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "goope:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.goope.jp/']",
			description: "DOM selector matches a known technology marker.",
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
