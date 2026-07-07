import type { TechnologyDefinition } from '../../types';

export const maakTechnologyDefinition = {
	id: "maak",
	name: "MAAK",
	website: "https://maak-code.ir",
	description: "MAAK is a Laravel based CMS developed by Mahdi Akbari.",
	icon: "MAAK.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "maak:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^MAAK$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "maak:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^maak$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
