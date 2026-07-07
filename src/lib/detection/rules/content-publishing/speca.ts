import type { TechnologyDefinition } from '../../types';

export const specaTechnologyDefinition = {
	id: "speca",
	name: "Speca",
	website: "https://speca.io",
	description: "Speca is a platform for API design and documentation.",
	icon: "Speca.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "speca:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/speca\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "speca:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Speca$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "speca:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^speca$", "i"),
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
