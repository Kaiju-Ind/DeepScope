import type { TechnologyDefinition } from '../../types';

export const demandbaseTechnologyDefinition = {
	id: "demandbase",
	name: "Demandbase",
	website: "https://www.demandbase.com",
	description: "Demandbase is a targeting and personalization platform for business-to-business companies.",
	icon: "demandbase.svg",
	categories: [
		"analytics",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "demandbase:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tag.demandbase.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "demandbase:jsGlobal:1",
			kind: "jsGlobal",
			property: "Demandbase",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "demandbase:jsGlobal:2",
			kind: "jsGlobal",
			property: "Demandbase.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "demandbase:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("\\.engagio\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "demandbase:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("\\.demandbase\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
