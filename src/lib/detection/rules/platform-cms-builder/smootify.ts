import type { TechnologyDefinition } from '../../types';

export const smootifyTechnologyDefinition = {
	id: "smootify",
	name: "Smootify",
	website: "https://www.smootify.io",
	description: "Smootify is a tool for designing ecommerce stores entirely within Webflow, with AI assistance to streamline the process.",
	icon: "Smootify.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "smootify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.smootify\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smootify:jsGlobal:1",
			kind: "jsGlobal",
			property: "Smootify",
			description: "Page-owned global matches a known technology marker.",
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
		"webflow",
	],
} as const satisfies TechnologyDefinition;
