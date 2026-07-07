import type { TechnologyDefinition } from '../../types';

export const unitoHubTechnologyDefinition = {
	id: "unito-hub",
	name: "Unito Hub",
	website: "https://unitohub.com",
	description: "Unito Hub is a unified data platform that integrates and consolidates data from multiple sources.",
	icon: "UnitoHub.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "unito-hub:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/unito\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "unito-hub:jsGlobal:1",
			kind: "jsGlobal",
			property: "Unito",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "unito-hub:jsGlobal:2",
			kind: "jsGlobal",
			property: "Unito.app_version",
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
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
