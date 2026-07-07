import type { TechnologyDefinition } from '../../types';

export const jetimobTechnologyDefinition = {
	id: "jetimob",
	name: "Jetimob",
	website: "https://www.jetimob.com",
	description: "Jetimob is a real estate management system that centralizes customer relationship management (CRM), rental management, and sales management within a single platform.",
	icon: "Jetimob.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "jetimob:dom:0",
			kind: "dom",
			selector: "link[href*='www.jetimob.com']",
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
