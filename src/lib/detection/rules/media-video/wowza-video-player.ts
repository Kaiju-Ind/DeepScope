import type { TechnologyDefinition } from '../../types';

export const wowzaVideoPlayerTechnologyDefinition = {
	id: "wowza-video-player",
	name: "Wowza Video Player",
	website: "https://www.wowza.com/video/player",
	description: "Wowza Video Player is a robust, industry standard player that provides HTML5, HLS, MPEG-DASH, and LL-DASH playback.",
	icon: "wowza.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "wowza-video-player:jsGlobal:0",
			kind: "jsGlobal",
			property: "WowzaPlayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wowza-video-player:jsGlobal:1",
			kind: "jsGlobal",
			property: "WowzaPlayer.jsplayer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
