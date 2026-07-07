import type { TechnologyDefinition } from '../../types';

export const quartoTechnologyDefinition = {
	id: "quarto",
	name: "Quarto",
	website: "https://quarto.org",
	description: "Quarto is an open-source technical publishing system.",
	icon: "Quarto.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "quarto:jsGlobal:0",
			kind: "jsGlobal",
			property: "quartoOpenSearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "quarto:jsGlobal:1",
			kind: "jsGlobal",
			property: "quartoToggleHeadroom",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "quarto:jsGlobal:2",
			kind: "jsGlobal",
			property: "quartoToggleReader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "quarto:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^quarto-([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
