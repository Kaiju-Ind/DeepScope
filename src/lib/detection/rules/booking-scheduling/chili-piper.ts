import type { TechnologyDefinition } from '../../types';

export const chiliPiperTechnologyDefinition = {
	id: "chili-piper",
	name: "Chili Piper",
	website: "https://www.chilipiper.com/",
	description: "Chili Piper is a suite of automated scheduling tools that help revenue teams convert leads.",
	icon: "Chili Piper.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "chili-piper:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.chilipiper\\.com\\/marketing\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chili-piper:jsGlobal:1",
			kind: "jsGlobal",
			property: "ChiliPiper",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
