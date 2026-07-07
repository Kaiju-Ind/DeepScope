import type { TechnologyDefinition } from '../../types';

export const prestoPlayerTechnologyDefinition = {
	id: "presto-player",
	name: "Presto Player",
	website: "https://prestoplayer.com",
	description: "Presto Player is a WordPress plugin designed for embedding optimised video and audio on WordPress websites.",
	icon: "PrestoPlayer.svg",
	categories: [
		"media-video",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "presto-player:jsGlobal:0",
			kind: "jsGlobal",
			property: "prestoComponents",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "presto-player:jsGlobal:1",
			kind: "jsGlobal",
			property: "prestoPlayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "presto-player:jsGlobal:2",
			kind: "jsGlobal",
			property: "prestoPlayer.proVersion",
			valuePattern: new RegExp("^(.+)$"),
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
			"low",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:prestoplayer:presto_player:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
