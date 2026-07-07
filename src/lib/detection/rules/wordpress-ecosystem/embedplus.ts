import type { TechnologyDefinition } from '../../types';

export const embedplusTechnologyDefinition = {
	id: "embedplus",
	name: "EmbedPlus",
	website: "https://www.embedplus.com",
	description: "EmbedPlus is a WordPress plugin for YouTube allows you to embed gallery, channel, playlist, or even live stream on your webpage.",
	icon: "EmbedPlus.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "embedplus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/youtube-embed-plus(?:-pro)?\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
