import type { TechnologyDefinition } from '../../types';

export const recruitionTechnologyDefinition = {
	id: "recruition",
	name: "Recruition",
	website: "https://recruition.nl",
	description: "Recruition is a software platform designed to streamline and manage the recruitment process.",
	icon: "Recruition.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "recruition:meta:0",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^Recruition", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "recruition:meta:1",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^recruition", "i"),
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
