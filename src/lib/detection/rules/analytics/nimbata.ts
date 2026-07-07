import type { TechnologyDefinition } from '../../types';

export const nimbataTechnologyDefinition = {
	id: "nimbata",
	name: "Nimbata",
	website: "https://www.nimbata.com",
	description: "Nimbata is a call tracking and conversion attribution platform designed to help marketing professionals, teams, and agencies make informed decisions to improve campaign performance.",
	icon: "Nimbata.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "nimbata:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dni\\.nimbata\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
