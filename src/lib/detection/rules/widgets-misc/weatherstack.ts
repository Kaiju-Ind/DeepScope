import type { TechnologyDefinition } from '../../types';

export const weatherstackTechnologyDefinition = {
	id: "weatherstack",
	name: "Weatherstack",
	website: "https://weatherstack.com",
	description: "Weatherstack is a weather API providing JSON and XML data for global locations in a lightweight format.",
	icon: "Weatherstack.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "weatherstack:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.apixu.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
