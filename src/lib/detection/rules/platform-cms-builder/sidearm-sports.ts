import type { TechnologyDefinition } from '../../types';

export const sidearmSportsTechnologyDefinition = {
	id: "sidearm-sports",
	name: "SIDEARM Sports",
	website: "https://sidearmsports.com/websites",
	description: "SIDEARM Sports provides the software and technology that powers the websites, livestats, and video streaming for athletic programs North America.",
	icon: "SIDEARM Sports.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sidearm-sports:jsGlobal:0",
			kind: "jsGlobal",
			property: "sidearmComponents",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sidearm-sports:jsGlobal:1",
			kind: "jsGlobal",
			property: "sidearmsports",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
