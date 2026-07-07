import type { TechnologyDefinition } from '../../types';

export const opencitiesTechnologyDefinition = {
	id: "opencities",
	name: "OpenCities",
	website: "https://granicus.com/solution/govaccess/opencities/",
	description: "OpenCities is a content management system built for government organizations.",
	icon: "granicus.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "opencities:jsGlobal:0",
			kind: "jsGlobal",
			property: "OpenCities",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "opencities:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Seamless\\.?CMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
