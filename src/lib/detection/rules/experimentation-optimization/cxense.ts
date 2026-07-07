import type { TechnologyDefinition } from '../../types';

export const cxenseTechnologyDefinition = {
	id: "cxense",
	name: "Cxense",
	website: "https://www.cxense.com",
	description: "Cxense was an AI-powered data management and intelligent personalisation platform.",
	icon: "Cxense.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "cxense:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cxense\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
