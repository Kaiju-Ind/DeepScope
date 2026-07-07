import type { TechnologyDefinition } from '../../types';

export const esputnikTechnologyDefinition = {
	id: "esputnik",
	name: "eSputnik",
	website: "https://esputnik.com",
	description: "eSputnik is a marketing automation service for ecommerce.",
	icon: "eSputnik.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "esputnik:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/\\/|\\.)esputnik\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "esputnik:jsGlobal:1",
			kind: "jsGlobal",
			property: "esSdk",
			valuePattern: new RegExp("^es$"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
