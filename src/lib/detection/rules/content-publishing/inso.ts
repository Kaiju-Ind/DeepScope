import type { TechnologyDefinition } from '../../types';

export const insoTechnologyDefinition = {
	id: "inso",
	name: "Inso",
	website: "https://inso.pl",
	description: "Inso is an application for kindergartens and nurseries that facilitates communication with parents and supports the automated preparation of billing information.",
	icon: "Inso.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "inso:header:0",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("app\\.inso\\.pl", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "inso:header:1",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("app\\.inso\\.pl", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
