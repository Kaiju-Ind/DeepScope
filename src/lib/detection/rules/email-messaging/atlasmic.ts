import type { TechnologyDefinition } from '../../types';

export const atlasmicTechnologyDefinition = {
	id: "atlasmic",
	name: "Atlasmic",
	website: "https://atlasmic.com",
	description: "Atlasmic is a live chat and business messenger platform designed to support modern online businesses.",
	icon: "Atlasmic.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "atlasmic:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.atlasmic\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "atlasmic:jsGlobal:1",
			kind: "jsGlobal",
			property: "atlasmic",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "atlasmic:jsGlobal:2",
			kind: "jsGlobal",
			property: "atlasmic.VERSION",
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
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
