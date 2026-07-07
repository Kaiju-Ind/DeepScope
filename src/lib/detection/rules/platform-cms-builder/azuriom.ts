import type { TechnologyDefinition } from '../../types';

export const azuriomTechnologyDefinition = {
	id: "azuriom",
	name: "Azuriom",
	website: "https://azuriom.com",
	description: "Azuriom is an open-source web solution for game servers, offering extensive customization through extensions.",
	icon: "Azuriom.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "azuriom:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^azuriom_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "azuriom:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Azuriom$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "azuriom:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^azuriom$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:azuriom:azuriom:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
