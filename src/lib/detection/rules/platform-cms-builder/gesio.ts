import type { TechnologyDefinition } from '../../types';

export const gesioTechnologyDefinition = {
	id: "gesio",
	name: "Gesio",
	website: "https://www.gesio.com",
	description: "Gesio is an online management application suite providing ERP solutions for wholesalers and B2B businesses.",
	icon: "Gesio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "gesio:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("www\\.gesio\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
