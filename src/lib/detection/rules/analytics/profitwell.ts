import type { TechnologyDefinition } from '../../types';

export const profitwellTechnologyDefinition = {
	id: "profitwell",
	name: "Profitwell",
	website: "https://www.profitwell.com/",
	icon: "Profitwell.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "profitwell:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("profitwell\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "profitwell:jsGlobal:1",
			kind: "jsGlobal",
			property: "profitwell",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
