import type { TechnologyDefinition } from '../../types';

export const jplayerTechnologyDefinition = {
	id: "jplayer",
	name: "jPlayer",
	website: "https://jplayer.org",
	description: "jPlayer is a cross-browser JavaScript library developed as a jQuery plugin which facilitates the embedding of web based media, notably HTML5 audio and video in addition to Adobe Flash based media.",
	icon: "jPlayer.png",
	categories: [
		"media-video",
		"widgets-misc",
	],
	rules: [
		{
			id: "jplayer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jquery\\.jplayer\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jplayer:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("jquery\\.jplayer\\.min\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "jplayer:jsGlobal:2",
			kind: "jsGlobal",
			property: "jPlayerPlaylist",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:happyworm:jplayer:*:*:*:*:*:*:*:*",
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
