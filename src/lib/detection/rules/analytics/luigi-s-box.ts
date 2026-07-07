import type { TechnologyDefinition } from '../../types';

export const luigiSBoxTechnologyDefinition = {
	id: "luigi-s-box",
	name: "Luigi’s Box",
	website: "https://www.luigisbox.com",
	icon: "Luigisbox.svg",
	categories: [
		"analytics",
		"search",
	],
	rules: [
		{
			id: "luigi-s-box:jsGlobal:0",
			kind: "jsGlobal",
			property: "Luigis",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "luigi-s-box:jsGlobal:1",
			kind: "jsGlobal",
			property: "LuigisBox",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
