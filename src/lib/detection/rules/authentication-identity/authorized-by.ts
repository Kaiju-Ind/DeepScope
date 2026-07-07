import type { TechnologyDefinition } from '../../types';

export const authorizedByTechnologyDefinition = {
	id: "authorized-by",
	name: "authorized.by",
	website: "https://www.authorized.by",
	description: "authorized.by is a service that enables shops to verify products and confirm their authenticity.",
	icon: "authorizedby.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "authorized-by:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.authorized\\.by"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
