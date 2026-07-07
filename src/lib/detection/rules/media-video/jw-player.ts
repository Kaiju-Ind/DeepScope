import type { TechnologyDefinition } from '../../types';

export const jwPlayerTechnologyDefinition = {
	id: "jw-player",
	name: "JW Player",
	website: "https://www.jwplayer.com",
	description: "JW Player is an online video player with video engagement analytics, custom video player skins, and live video streaming capability.",
	icon: "JW Player.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "jw-player:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.jwplayer\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jw-player:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.jwpcdn\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jw-player:requestUrl:2",
			kind: "requestUrl",
			pattern: new RegExp("\\.jwpsrv\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "jw-player:dom:3",
			kind: "dom",
			selector: "div[data-video-provider*=jwplayer]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "jw-player:jsGlobal:4",
			kind: "jsGlobal",
			property: "jwDefaults",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jw-player:jsGlobal:5",
			kind: "jsGlobal",
			property: "jwplayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jw-player:jsGlobal:6",
			kind: "jsGlobal",
			property: "jwplayerApiUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jw-player:jsGlobal:7",
			kind: "jsGlobal",
			property: "webpackJsonpjwplayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jw-player:dom:8",
			kind: "dom",
			selector: "div[class^='jwplayer']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "jw-player:scriptSrc:9",
			kind: "scriptSrc",
			pattern: new RegExp("\\.(?:jwplayer|jwpcdn)\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jw-player:dom:10",
			kind: "dom",
			selector: "div[data-video-provider*=jwplayer], div[class^='jwplayer']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
