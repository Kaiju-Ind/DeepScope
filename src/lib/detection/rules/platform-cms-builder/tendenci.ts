import type { TechnologyDefinition } from '../../types';

export const tendenciTechnologyDefinition = {
	id: "tendenci",
	name: "Tendenci",
	website: "https://www.tendenci.com",
	description: "Tendenci is a platform that provides resources for managing and organizing website content without requiring knowledge of HTML or complex programming tools.",
	icon: "Tendenci.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tendenci:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Tendenci$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tendenci:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^tendenci$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:tendenci:tendenci:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
