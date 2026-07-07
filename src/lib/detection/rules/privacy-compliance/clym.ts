import type { TechnologyDefinition } from '../../types';

export const clymTechnologyDefinition = {
	id: "clym",
	name: "Clym",
	website: "https://clym.io",
	description: "Clym is a data privacy tool designed to support compliance with data protection obligations.",
	icon: "Clym.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "clym:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.clym-sdk\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "clym:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^clym_compliance_sid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
