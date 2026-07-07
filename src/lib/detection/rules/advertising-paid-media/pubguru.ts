import type { TechnologyDefinition } from '../../types';

export const pubguruTechnologyDefinition = {
	id: "pubguru",
	name: "PubGuru",
	website: "https://pubguru.com",
	description: "PubGuru is a header wrapper and ad ops platform.",
	icon: "PubGuru.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "pubguru:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pubguru\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pubguru:jsGlobal:1",
			kind: "jsGlobal",
			property: "pg.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			confidence: 25,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
