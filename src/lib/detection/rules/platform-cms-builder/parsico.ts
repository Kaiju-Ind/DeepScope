import type { TechnologyDefinition } from '../../types';

export const parsicoTechnologyDefinition = {
	id: "parsico",
	name: "PARSICO",
	website: "https://parsico.org/",
	description: "PARSICO is a website builder that simplifies the creation of responsive websites through an intuitive interface.",
	icon: "PARSICO.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "parsico:dom:0",
			kind: "dom",
			selector: "script[src*='parsico.js']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
