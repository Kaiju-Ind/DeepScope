import type { TechnologyDefinition } from '../../types';

export const playTechnologyDefinition = {
	id: "play",
	name: "Play",
	website: "https://www.playframework.com",
	icon: "Play.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "play:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^PLAY_SESSION$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "play:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^play_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:playframework:play_framework:*:*:*:*:*:*:*:*",
	},
	implies: [
		"scala",
	],
} as const satisfies TechnologyDefinition;
