import type { TechnologyDefinition } from '../../types';

export const attraqtTechnologyDefinition = {
	id: "attraqt",
	name: "Attraqt",
	website: "https://www.attraqt.com/",
	description: "Attraqt provides AI-driven search, merchandising and personalisation solutions.",
	icon: "Attraqt.png",
	categories: [
		"search",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "attraqt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.attraqt\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "attraqt:jsGlobal:1",
			kind: "jsGlobal",
			property: "_attraqt",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
