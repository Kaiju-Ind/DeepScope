import type { TechnologyDefinition } from '../../types';

export const cuxTechnologyDefinition = {
	id: "cux",
	name: "Cux",
	website: "https://cux.io",
	description: "Cux is a UX automation tool designed to enhance conversion rates by analysing and utilising behavioural patterns.",
	icon: "Cux.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "cux:jsGlobal:0",
			kind: "jsGlobal",
			property: "_cux.send",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cux:jsGlobal:1",
			kind: "jsGlobal",
			property: "_cuxSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cux:jsGlobal:2",
			kind: "jsGlobal",
			property: "_cux_q",
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
