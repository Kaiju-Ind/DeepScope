import type { TechnologyDefinition } from '../../types';

export const twitchPlayerTechnologyDefinition = {
	id: "twitch-player",
	name: "Twitch Player",
	website: "https://dev.twitch.tv/docs/embed/video-and-clips/",
	description: "Twitch is an American video live streaming service that focuses on video game live streaming, including broadcasts of esports competitions.",
	icon: "Twitch.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "twitch-player:dom:0",
			kind: "dom",
			selector: "iframe[src*='player\\.twitch\\.tv']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "twitch-player:jsGlobal:1",
			kind: "jsGlobal",
			property: "Twitch.Player",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "twitch-player:jsGlobal:2",
			kind: "jsGlobal",
			property: "Twitch.Embed",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "twitch-player:jsGlobal:3",
			kind: "jsGlobal",
			property: "twitchPlayer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
