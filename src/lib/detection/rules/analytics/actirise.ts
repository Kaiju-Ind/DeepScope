import type { TechnologyDefinition } from '../../types';

export const actiriseTechnologyDefinition = {
	id: "actirise",
	name: "Actirise",
	website: "https://corporate.actirise.com",
	description: "Actirise is a monetization and business intelligence platform.",
	icon: "Actirise.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "actirise:dom:0",
			kind: "dom",
			selector: "div[data-actirise]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "actirise:jsGlobal:1",
			kind: "jsGlobal",
			property: "ActiriseSafeFrame",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "actirise:jsGlobal:2",
			kind: "jsGlobal",
			property: "actirisePlugin.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
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
