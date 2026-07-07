import type { TechnologyDefinition } from '../../types';

export const brightcoveTechnologyDefinition = {
	id: "brightcove",
	name: "Brightcove",
	website: "https://www.brightcove.com",
	description: "Brightcove is an online video platform for hosting, streaming, monetizing, and analyzing video.",
	icon: "Brightcove.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "brightcove:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("players\\.brightcove\\.net\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "brightcove:dom:1",
			kind: "dom",
			selector: "iframe[src*='players.brightcove.'], link[href*='players.brightcove.']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
