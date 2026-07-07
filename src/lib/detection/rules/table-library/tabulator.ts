import type { TechnologyDefinition } from '../../types';

export const tabulatorTechnologyDefinition = {
	id: "tabulator",
	name: "Tabulator",
	website: "https://tabulator.info/",
	description: "Tabulator is a JavaScript tool for creating interactive tables and data grids.",
	icon: "Tabulator.svg",
	categories: [
		"table-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "tabulator:jsGlobal:0",
			kind: "jsGlobal",
			property: "Tabulator",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
