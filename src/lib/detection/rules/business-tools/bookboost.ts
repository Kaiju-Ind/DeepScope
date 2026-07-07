import type { TechnologyDefinition } from '../../types';

export const bookboostTechnologyDefinition = {
	id: "bookboost",
	name: "Bookboost",
	website: "https://www.bookboost.io",
	description: "Bookboost is a CRM designed to manage hotel guest interactions and improve guest retention.",
	icon: "Bookboost.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "bookboost:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("web-messenger\\.bookboost\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bookboost:jsGlobal:1",
			kind: "jsGlobal",
			property: "BookboostWebMessengerObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
