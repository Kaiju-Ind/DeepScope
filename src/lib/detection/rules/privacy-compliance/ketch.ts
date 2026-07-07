import type { TechnologyDefinition } from '../../types';

export const ketchTechnologyDefinition = {
	id: "ketch",
	name: "Ketch",
	website: "https://www.ketch.com",
	description: "Ketch is a data control platform that manages compliance with privacy regulations.",
	icon: "Ketch.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "ketch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ketchcdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
