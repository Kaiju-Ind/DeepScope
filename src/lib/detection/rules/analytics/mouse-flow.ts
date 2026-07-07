import type { TechnologyDefinition } from '../../types';

export const mouseFlowTechnologyDefinition = {
	id: "mouse-flow",
	name: "Mouse Flow",
	website: "https://mouseflow.com/",
	icon: "Mouseflow.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "mouse-flow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.mouseflow\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mouse-flow:jsGlobal:1",
			kind: "jsGlobal",
			property: "_mfq",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
