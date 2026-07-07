import type { TechnologyDefinition } from '../../types';

export const firstimpressionIoTechnologyDefinition = {
	id: "firstimpression-io",
	name: "FirstImpression.io",
	website: "https://www.firstimpression.io",
	description: "FirstImpression.io is a customized ad placements for publisher websites on their platform, with zero technical work.",
	icon: "FirstImpression.io.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "firstimpression-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.firstimpression\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "firstimpression-io:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.firstimpression\\.io"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "firstimpression-io:jsGlobal:2",
			kind: "jsGlobal",
			property: "FI.options",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "firstimpression-io:jsGlobal:3",
			kind: "jsGlobal",
			property: "fiPrebidAnalyticsHandler",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
