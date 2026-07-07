import type { TechnologyDefinition } from '../../types';

export const smartlingTechnologyDefinition = {
	id: "smartling",
	name: "Smartling",
	website: "https://www.smartling.com",
	description: "Smartling is a cloud-based translation management system.",
	icon: "Smartling.svg",
	categories: [
		"translations",
	],
	rules: [
		{
			id: "smartling:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.smartling\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smartling:jsGlobal:1",
			kind: "jsGlobal",
			property: "populateSmartlingDdl",
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
