import type { TechnologyDefinition } from '../../types';

export const cartumTechnologyDefinition = {
	id: "cartum",
	name: "Cartum",
	website: "https://cartum.io",
	description: "Cartum is a platform offering essential tools for launching and managing online stores.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cartum:jsGlobal:0",
			kind: "jsGlobal",
			property: "Horoshop.Widgets",
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
