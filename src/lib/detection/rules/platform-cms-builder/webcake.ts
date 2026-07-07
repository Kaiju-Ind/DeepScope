import type { TechnologyDefinition } from '../../types';

export const webcakeTechnologyDefinition = {
	id: "webcake",
	name: "Webcake",
	website: "https://webcake.io",
	description: "Webcake is a platform for designing visually appealing landing pages.",
	icon: "Webcake.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webcake:jsGlobal:0",
			kind: "jsGlobal",
			property: "WebcakeAddresses",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webcake:jsGlobal:1",
			kind: "jsGlobal",
			property: "WebcakeScript",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
