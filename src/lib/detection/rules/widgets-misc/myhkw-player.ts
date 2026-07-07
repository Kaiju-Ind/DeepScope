import type { TechnologyDefinition } from '../../types';

export const myhkwPlayerTechnologyDefinition = {
	id: "myhkw-player",
	name: "Myhkw player",
	website: "https://myhkw.cn",
	description: "Myhkw player is a website music player.",
	icon: "Myhkw player.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "myhkw-player:jsGlobal:0",
			kind: "jsGlobal",
			property: "myhk_player_songid",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "myhkw-player:jsGlobal:1",
			kind: "jsGlobal",
			property: "myhkplayerlist",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
