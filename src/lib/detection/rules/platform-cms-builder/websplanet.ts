import type { TechnologyDefinition } from '../../types';

export const websplanetTechnologyDefinition = {
	id: "websplanet",
	name: "WebsPlanet",
	website: "https://websplanet.com",
	icon: "WebsPlanet.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "websplanet:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("WebsPlanet", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "websplanet:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("websplanet", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
