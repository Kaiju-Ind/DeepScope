import type { TechnologyDefinition } from '../../types';

export const townnewsTechnologyDefinition = {
	id: "townnews",
	name: "TownNews",
	website: "https://townnews.com/",
	description: "TownNews is a CMS platform built for local media organizations.",
	icon: "townnews.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "townnews:jsGlobal:0",
			kind: "jsGlobal",
			property: "TNCMS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "townnews:jsGlobal:1",
			kind: "jsGlobal",
			property: "TNStats_Tracker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "townnews:jsGlobal:2",
			kind: "jsGlobal",
			property: "TNTracker",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
