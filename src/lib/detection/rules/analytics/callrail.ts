import type { TechnologyDefinition } from '../../types';

export const callrailTechnologyDefinition = {
	id: "callrail",
	name: "CallRail",
	website: "https://www.callrail.com",
	description: "CallRail is a service that tracks and manages your phone leads, helping businesses to determine which marketing campaigns are driving quality leads.",
	icon: "CallRail.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "callrail:jsGlobal:0",
			kind: "jsGlobal",
			property: "CallTrk",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "callrail:jsGlobal:1",
			kind: "jsGlobal",
			property: "CallTrkSwap",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "callrail:jsGlobal:2",
			kind: "jsGlobal",
			property: "crwpVer",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
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
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
