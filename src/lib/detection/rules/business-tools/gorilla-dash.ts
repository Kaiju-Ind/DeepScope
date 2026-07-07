import type { TechnologyDefinition } from '../../types';

export const gorillaDashTechnologyDefinition = {
	id: "gorilla-dash",
	name: "Gorilla Dash",
	website: "https://gorilladash.com",
	description: "Gorilla Dash is a tool for franchises and businesses with multiple locations, providing management and operational support.",
	icon: "GorillaDash.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "gorilla-dash:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/gorilladash\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gorilla-dash:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.gorilladash\\.com"),
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
} as const satisfies TechnologyDefinition;
