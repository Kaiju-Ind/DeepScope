import type { TechnologyDefinition } from '../../types';

export const starhostTechnologyDefinition = {
	id: "starhost",
	name: "Starhost",
	website: "https://starhost.verbosec.com",
	description: "Starhost provides a Platform-as-a-Service (PaaS) for website building, web hosting, and domain registration.",
	icon: "Starhost.svg",
	categories: [
		"platform-cms-builder",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "starhost:header:0",
			kind: "header",
			key: "Cache-Control",
			valuePattern: new RegExp("Starhost", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "starhost:header:1",
			kind: "header",
			key: "cache-control",
			valuePattern: new RegExp("starhost", "i"),
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
