import type { TechnologyDefinition } from '../../types';

export const lipscoreTechnologyDefinition = {
	id: "lipscore",
	name: "LipScore",
	website: "https://lipscore.com",
	description: "LipScore is a ratings and reviews engine.",
	icon: "LipScore.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "lipscore:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lipscore\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lipscore:jsGlobal:1",
			kind: "jsGlobal",
			property: "LipscoreSwiper",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lipscore:jsGlobal:2",
			kind: "jsGlobal",
			property: "wcLipscoreInit",
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
