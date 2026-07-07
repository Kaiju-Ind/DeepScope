import type { TechnologyDefinition } from '../../types';

export const airbridgeTechnologyDefinition = {
	id: "airbridge",
	name: "Airbridge",
	website: "https://www.airbridge.io",
	description: "Airbridge is a marketing attribution tool that helps you measure and attribute growth to your marketing campaigns.",
	icon: "Airbridge.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "airbridge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.airbridge\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "airbridge:jsGlobal:1",
			kind: "jsGlobal",
			property: "airBridgeSentData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "airbridge:jsGlobal:2",
			kind: "jsGlobal",
			property: "airbridge.version",
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
