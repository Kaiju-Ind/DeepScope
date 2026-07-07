import type { TechnologyDefinition } from '../../types';

export const treasureDataTechnologyDefinition = {
	id: "treasure-data",
	name: "Treasure Data",
	website: "https://www.treasuredata.com",
	description: "Treasure Data is the only enterprise customer data platform.",
	icon: "Treasure Data.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "treasure-data:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.treasuredata\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "treasure-data:dom:1",
			kind: "dom",
			selector: "link[href*='.treasuredata.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "treasure-data:jsGlobal:2",
			kind: "jsGlobal",
			property: "Treasure.version",
			valuePattern: new RegExp("(.+)"),
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
