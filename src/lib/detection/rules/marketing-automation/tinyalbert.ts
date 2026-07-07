import type { TechnologyDefinition } from '../../types';

export const tinyalbertTechnologyDefinition = {
	id: "tinyalbert",
	name: "tinyAlbert",
	website: "https://www.tinyalbert.ai",
	description: "tinyAlbert is an AI-powered email marketing manager that automates the creation, scheduling, and management of email campaigns.",
	icon: "tinyAlbert.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "tinyalbert:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.tinyeinstein\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tinyalbert:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("api\\.tinyalbert\\.ai"),
			description: "Script content contains a bounded technology signature.",
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
