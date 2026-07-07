import type { TechnologyDefinition } from '../../types';

export const convivaTechnologyDefinition = {
	id: "conviva",
	name: "Conviva",
	website: "https://www.conviva.com",
	description: "Conviva is a census, continuous measurement and engagement platform for streaming media.",
	icon: "conviva.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "conviva:jsGlobal:0",
			kind: "jsGlobal",
			property: "Conviva",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "conviva:jsGlobal:1",
			kind: "jsGlobal",
			property: "Conviva.Client",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "conviva:jsGlobal:2",
			kind: "jsGlobal",
			property: "Conviva.Client.version",
			valuePattern: new RegExp("^([0-9\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
