import type { TechnologyDefinition } from '../../types';

export const flocklerTechnologyDefinition = {
	id: "flockler",
	name: "Flockler",
	website: "https://flockler.com",
	description: "Flockler is a social hub content integration system that aggregates and displays social media content from multiple platforms onto websites or digital screens.",
	icon: "Flockler.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "flockler:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.flockler\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flockler:jsGlobal:1",
			kind: "jsGlobal",
			property: "FLOCKLER_EMBEDS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flockler:jsGlobal:2",
			kind: "jsGlobal",
			property: "_flocklerOverride",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
