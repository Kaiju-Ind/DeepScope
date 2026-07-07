import type { TechnologyDefinition } from '../../types';

export const dotdigitalTechnologyDefinition = {
	id: "dotdigital",
	name: "Dotdigital",
	website: "https://dotdigital.com",
	description: "Dotdigital is an all-in-one cloud-based customer engagement multichannel marketing platform.",
	icon: "Dotdigital.svg",
	categories: [
		"marketing-automation",
		"analytics",
	],
	rules: [
		{
			id: "dotdigital:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/_dmptv([\\d.]+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dotdigital:jsGlobal:1",
			kind: "jsGlobal",
			property: "dmPt",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dotdigital:jsGlobal:2",
			kind: "jsGlobal",
			property: "dm_insight_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dotdigital:jsGlobal:3",
			kind: "jsGlobal",
			property: "dmtrackingobjectname",
			confidence: 75,
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
