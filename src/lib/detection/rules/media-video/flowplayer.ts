import type { TechnologyDefinition } from '../../types';

export const flowplayerTechnologyDefinition = {
	id: "flowplayer",
	name: "Flowplayer",
	website: "https://flowplayer.com",
	description: "Flowplayer is a scalable, performance-first HTML 5 video player and platform hosting solution for publishers, broadcasters and digital media.",
	icon: "Flowplayer.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "flowplayer:jsGlobal:0",
			kind: "jsGlobal",
			property: "flowplayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flowplayer:jsGlobal:1",
			kind: "jsGlobal",
			property: "flowplayer.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
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
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
