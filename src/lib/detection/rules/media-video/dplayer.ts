import type { TechnologyDefinition } from '../../types';

export const dplayerTechnologyDefinition = {
	id: "dplayer",
	name: "DPlayer",
	website: "https://dplayer.js.org",
	description: "DPlayer is an HTML 5 video player that supports pop-up.",
	icon: "DPlayer.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "dplayer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/dplayer\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dplayer:jsGlobal:1",
			kind: "jsGlobal",
			property: "DPlayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dplayer:jsGlobal:2",
			kind: "jsGlobal",
			property: "DPlayer.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
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
