import type { TechnologyDefinition } from '../../types';

export const webitoTechnologyDefinition = {
	id: "webito",
	name: "Webito",
	website: "http://webito.co",
	description: "Webito is a website builder that uses AI to provide flexible and scalable site creation.",
	icon: "Webito.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webito:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^webito website builder$", "i"),
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
