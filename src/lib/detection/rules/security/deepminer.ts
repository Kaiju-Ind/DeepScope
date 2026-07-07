import type { TechnologyDefinition } from '../../types';

export const deepminerTechnologyDefinition = {
	id: "deepminer",
	name: "deepMiner",
	website: "https://github.com/deepwn/deepMiner",
	icon: "deepminer.png",
	categories: [
		"security",
	],
	rules: [
		{
			id: "deepminer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("deepMiner\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "deepminer:jsGlobal:1",
			kind: "jsGlobal",
			property: "deepMiner",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "deepminer:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("deepminer\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
