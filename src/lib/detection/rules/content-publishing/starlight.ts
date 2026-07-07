import type { TechnologyDefinition } from '../../types';

export const starlightTechnologyDefinition = {
	id: "starlight",
	name: "Starlight",
	website: "https://starlight.astro.build",
	description: "Starlight is a documentation website builder for the Astro framework.",
	icon: "Starlight.svg",
	categories: [
		"content-publishing",
		"framework",
	],
	rules: [
		{
			id: "starlight:jsGlobal:0",
			kind: "jsGlobal",
			property: "StarlightThemeProvider.updatePickers",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "starlight:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Starlight v([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "starlight:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Starlight\\sv([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "starlight:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^starlight\\sv([\\d\\.]+)$", "i"),
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
	requires: [
		"astro",
	],
} as const satisfies TechnologyDefinition;
