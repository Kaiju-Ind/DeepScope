import type { TechnologyDefinition } from '../../types';

export const shopliftTechnologyDefinition = {
	id: "shoplift",
	name: "Shoplift",
	website: "https://www.shoplift.ai",
	description: "Shoplift is a data-driven A/B testing platform for Shopify stores that optimizes conversion rates without requiring coding.",
	icon: "Shoplift.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "shoplift:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.shoplift\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "shoplift:jsGlobal:1",
			kind: "jsGlobal",
			property: "shoplift.getVisitorData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shoplift:jsGlobal:2",
			kind: "jsGlobal",
			property: "shopliftInstance",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
