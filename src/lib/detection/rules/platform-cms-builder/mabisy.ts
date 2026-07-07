import type { TechnologyDefinition } from '../../types';

export const mabisyTechnologyDefinition = {
	id: "mabisy",
	name: "Mabisy",
	website: "https://www.mabisy.com",
	description: "Mabisy is an online platform facilitating the creation of custom ecommerce stores.",
	icon: "Mabisy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mabisy:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Mabisy$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mabisy:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^mabisy$", "i"),
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
