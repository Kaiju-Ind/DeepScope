import type { TechnologyDefinition } from '../../types';

export const shakaPlayerTechnologyDefinition = {
	id: "shaka-player",
	name: "Shaka Player",
	website: "https://github.com/shaka-project/shaka-player",
	description: "Shaka Player is an open-source JavaScript library for adaptive media.",
	icon: "Shaka Player.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "shaka-player:jsGlobal:0",
			kind: "jsGlobal",
			property: "shaka.Player.version",
			valuePattern: new RegExp("v([\\d\\.-\\w]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shaka-player:jsGlobal:1",
			kind: "jsGlobal",
			property: "shaka.Player.version",
			valuePattern: new RegExp("v([\\d\\.\\-\\w]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
