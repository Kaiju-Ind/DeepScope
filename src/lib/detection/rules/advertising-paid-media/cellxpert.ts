import type { TechnologyDefinition } from '../../types';

export const cellxpertTechnologyDefinition = {
	id: "cellxpert",
	name: "Cellxpert",
	website: "https://www.cellxpert.com",
	description: "Cellxpert is a SaaS platform for affiliate and partner program management, providing tools for tracking, reporting, and optimizing performance-based marketing campaigns.",
	icon: "Cellxpert.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "cellxpert:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cellxpert\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cellxpert:dom:1",
			kind: "dom",
			selector: "link[href*='.cellxpert.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
