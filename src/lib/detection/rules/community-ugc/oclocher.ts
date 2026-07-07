import type { TechnologyDefinition } from '../../types';

export const oclocherTechnologyDefinition = {
	id: "oclocher",
	name: "Oclocher",
	website: "https://www.oclocher.fr",
	description: "Oclocher is a parish animation app used by parishes and dioceses to help maintain connections between parishioners from one Sunday to the next.",
	icon: "OClocher.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "oclocher:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.oclocher\\.fr"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "oclocher:header:1",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("widget\\.oclocher\\.fr", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "oclocher:header:2",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("widget\\.oclocher\\.fr", "i"),
			description: "Response header matches a known technology marker.",
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
