import type { TechnologyDefinition } from '../../types';

export const rayoTechnologyDefinition = {
	id: "rayo",
	name: "Rayo",
	website: "https://www.rayo.ir",
	icon: "Rayo.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rayo:jsGlobal:0",
			kind: "jsGlobal",
			property: "Rayo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rayo:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Rayo", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rayo:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^rayo", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"angularjs",
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
