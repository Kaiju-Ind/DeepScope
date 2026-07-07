import type { TechnologyDefinition } from '../../types';

export const inputflowTechnologyDefinition = {
	id: "inputflow",
	name: "Inputflow",
	website: "https://inputflow.com",
	description: "Inputflow is a tool for creating multi-step forms in Webflow with full customization options.",
	icon: "Inputflow.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "inputflow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.inputflow\\.io"),
			description: "Script source URL matches a known technology marker.",
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
		"webflow",
	],
} as const satisfies TechnologyDefinition;
