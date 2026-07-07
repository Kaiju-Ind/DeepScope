import type { TechnologyDefinition } from '../../types';

export const omieTechnologyDefinition = {
	id: "omie",
	name: "Omie",
	website: "https://omie.com.br",
	description: "Omie is a combined content management and ecommerce system based in Brazil.",
	icon: "Omie.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "omie:jsGlobal:0",
			kind: "jsGlobal",
			property: "omieInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "omie:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Omie$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "omie:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^omie$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
