import type { TechnologyDefinition } from '../../types';

export const gensolveTechnologyDefinition = {
	id: "gensolve",
	name: "Gensolve",
	website: "https://www.gensolve.com",
	description: "Gensolve is a practice management software developed in New Zealand for managing appointments, billing, clinical records, and administrative workflows.",
	icon: "Gensolve.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "gensolve:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.gensolve\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gensolve:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.gensolve\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
