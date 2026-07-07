import type { TechnologyDefinition } from '../../types';

export const nabbleTechnologyDefinition = {
	id: "nabble",
	name: "Nabble",
	website: "https://nabble.com",
	description: "Nabble is a platform offering free forum hosting and online web applications with customizable features.",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "nabble:jsGlobal:0",
			kind: "jsGlobal",
			property: "Nabble.analytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nabble:jsGlobal:1",
			kind: "jsGlobal",
			property: "NabbleDropdown",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nabble:jsGlobal:2",
			kind: "jsGlobal",
			property: "t_show_nabble_notice",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
