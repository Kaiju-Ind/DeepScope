import type { TechnologyDefinition } from '../../types';

export const zenfolioTechnologyDefinition = {
	id: "zenfolio",
	name: "Zenfolio",
	website: "https://zenfolio.com",
	description: "Zenfolio is a photography website builder.",
	icon: "Zenfolio.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "zenfolio:jsGlobal:0",
			kind: "jsGlobal",
			property: "Zenfolio",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
