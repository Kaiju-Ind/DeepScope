import type { TechnologyDefinition } from '../../types';

export const nordcraftTechnologyDefinition = {
	id: "nordcraft",
	name: "Nordcraft",
	website: "https://nordcraft.com",
	description: "Nordcraft is a platform that integrates a visual design tool with a web framework, enabling the creation of web applications and websites in a unified environment.",
	icon: "Nordcraft.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "nordcraft:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Nordcraft$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "nordcraft:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Nordcraft$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "nordcraft:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^nordcraft$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "nordcraft:meta:3",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^nordcraft$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
