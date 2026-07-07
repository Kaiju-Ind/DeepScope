import type { TechnologyDefinition } from '../../types';

export const fluidPlayerTechnologyDefinition = {
	id: "fluid-player",
	name: "Fluid Player",
	website: "https://www.fluidplayer.com",
	description: "Fluid Player is an open-source HTML5 video player.",
	icon: "FluidPlayer.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "fluid-player:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.fluidplayer\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fluid-player:jsGlobal:1",
			kind: "jsGlobal",
			property: "fluidPlayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fluid-player:jsGlobal:2",
			kind: "jsGlobal",
			property: "webpackChunkfluid_player",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
