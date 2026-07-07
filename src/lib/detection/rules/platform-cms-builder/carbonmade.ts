import type { TechnologyDefinition } from '../../types';

export const carbonmadeTechnologyDefinition = {
	id: "carbonmade",
	name: "Carbonmade",
	website: "https://carbonmade.com",
	description: "Carbonmade is an online portfolio platform that provides tools and templates for creating and showcasing digital portfolios.",
	icon: "Carbonmade.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "carbonmade:dom:0",
			kind: "dom",
			selector: "link[href*='carbon-media.accelerator.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "carbonmade:jsGlobal:1",
			kind: "jsGlobal",
			property: "Carbon.ActionKit",
			description: "Page-owned global matches a known technology marker.",
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
