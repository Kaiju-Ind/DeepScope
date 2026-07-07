import type { TechnologyDefinition } from '../../types';

export const decoCxTechnologyDefinition = {
	id: "deco-cx",
	name: "Deco.cx",
	website: "https://deco.cx",
	description: "Deco.cx is an enterprise frontend platform designed to optimize and accelerate ecommerce performance.",
	icon: "Deco.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "deco-cx:jsGlobal:0",
			kind: "jsGlobal",
			property: "DECO.events",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "deco-cx:jsGlobal:1",
			kind: "jsGlobal",
			property: "DECO_SITES_STD",
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
} as const satisfies TechnologyDefinition;
