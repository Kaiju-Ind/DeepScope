import type { TechnologyDefinition } from '../../types';

export const noibuTechnologyDefinition = {
	id: "noibu",
	name: "Noibu",
	website: "https://noibu.com",
	description: "Noibu helps ecommerce websites detect revenue-impacting errors on their websites and provides them with the information needed to resolve them.",
	icon: "noibu.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "noibu:jsGlobal:0",
			kind: "jsGlobal",
			property: "NOIBUJS_CONFIG",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
