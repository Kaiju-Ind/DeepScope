import type { TechnologyDefinition } from '../../types';

export const videopalTechnologyDefinition = {
	id: "videopal",
	name: "VideoPal",
	website: "https://www.videopal.io/go/",
	description: "VideoPal is an avatar widget that functions as a help system, providing interactive assistance directly within the user interface.",
	icon: "VideoPal.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "videopal:jsGlobal:0",
			kind: "jsGlobal",
			property: "VideoPalEmbed",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "videopal:jsGlobal:1",
			kind: "jsGlobal",
			property: "VpPlayer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
