import type { TechnologyDefinition } from '../../types';

export const hotmartTechnologyDefinition = {
	id: "hotmart",
	name: "Hotmart",
	website: "https://hotmart.com",
	description: "HotMart is a Brazilian-based affiliate marketing system.",
	icon: "Hotmart.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "hotmart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hotmart\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hotmart:jsGlobal:1",
			kind: "jsGlobal",
			property: "HotmartLauncherObject",
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
