import type { TechnologyDefinition } from '../../types';

export const omacroTechnologyDefinition = {
	id: "omacro",
	name: "Omacro",
	website: "https://omacro.com",
	description: "Omacro is a platform focused on enhancing digital engagement by facilitating connections and increasing conversion rates.",
	icon: "Omacro.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "omacro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("buynow\\.omacro\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "omacro:jsGlobal:1",
			kind: "jsGlobal",
			property: "omacro.buynow",
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
} as const satisfies TechnologyDefinition;
