import type { TechnologyDefinition } from '../../types';

export const bestieTechnologyDefinition = {
	id: "bestie",
	name: "Bestie",
	website: "https://www.bestie.ai",
	description: "Bestie is a platform that provides AI-powered post-purchase surveys for Shopify brands, automating the survey creation process.",
	icon: "Bestie.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "bestie:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.bestie\\.ai"),
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
