import type { TechnologyDefinition } from '../../types';

export const apisearchTechnologyDefinition = {
	id: "apisearch",
	name: "Apisearch",
	website: "https://apisearch.io",
	description: "Apisearch is a real-time search platform for ecommerce.",
	icon: "Apisearch.png",
	categories: [
		"search",
	],
	rules: [
		{
			id: "apisearch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.apisearch\\.cloud"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
