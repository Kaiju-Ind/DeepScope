import type { TechnologyDefinition } from '../../types';

export const picoTechnologyDefinition = {
	id: "pico",
	name: "Pico",
	website: "https://trypico.com",
	icon: "pico.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "pico:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.pico\\.tools"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pico:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pico",
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
