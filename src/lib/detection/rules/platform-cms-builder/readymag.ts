import type { TechnologyDefinition } from '../../types';

export const readymagTechnologyDefinition = {
	id: "readymag",
	name: "Readymag",
	website: "https://readymag.com",
	description: "Readymag is a browser-based design tool that helps create websites, portfolios and all kinds of online publications without coding.",
	icon: "Readymag.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "readymag:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Readymag$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "readymag:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^readymag$", "i"),
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
