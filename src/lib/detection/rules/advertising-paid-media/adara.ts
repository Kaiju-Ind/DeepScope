import type { TechnologyDefinition } from '../../types';

export const adaraTechnologyDefinition = {
	id: "adara",
	name: "Adara",
	website: "https://adara.com",
	description: "Adara is a tourism advertising system.",
	icon: "Adara.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adara:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adara\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adara:jsGlobal:1",
			kind: "jsGlobal",
			property: "adara",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
