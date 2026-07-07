import type { TechnologyDefinition } from '../../types';

export const uKomiTechnologyDefinition = {
	id: "u-komi",
	name: "U-KOMI",
	website: "https://u-komi.com/en/",
	description: "U-KOMI is a user generated content review marketing tool.",
	icon: "U-KOMI.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "u-komi:jsGlobal:0",
			kind: "jsGlobal",
			property: "GetUkomiSliderItemInfo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "u-komi:jsGlobal:1",
			kind: "jsGlobal",
			property: "ukomiInstaLikeStep01",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "u-komi:jsGlobal:2",
			kind: "jsGlobal",
			property: "installUkomiShimsDebug",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
