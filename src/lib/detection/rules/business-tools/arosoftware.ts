import type { TechnologyDefinition } from '../../types';

export const arosoftwareTechnologyDefinition = {
	id: "arosoftware",
	name: "AroSoftware",
	website: "https://www.arosoftware.com",
	description: "AroSoftware provides real estate CRM and website design solutions.",
	icon: "AroSoftware.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "arosoftware:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^AroSoftware Pty Ltd$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "arosoftware:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^arosoftware pty ltd$", "i"),
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
