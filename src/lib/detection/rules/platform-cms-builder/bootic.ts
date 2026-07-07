import type { TechnologyDefinition } from '../../types';

export const booticTechnologyDefinition = {
	id: "bootic",
	name: "Bootic",
	website: "https://www.bootic.io",
	description: "Bootic is an all-in-one ecommerce platform from Chile.",
	icon: "Bootic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bootic:jsGlobal:0",
			kind: "jsGlobal",
			property: "Bootic.assetsHost",
			valuePattern: new RegExp("assets\\.btcdn\\.co"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bootic:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Bootic$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bootic:meta:2",
			kind: "meta",
			key: "autor",
			valuePattern: new RegExp("^Bootic$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bootic:meta:3",
			kind: "meta",
			key: "autor",
			valuePattern: new RegExp("^bootic$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
