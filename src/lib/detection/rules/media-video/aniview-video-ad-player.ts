import type { TechnologyDefinition } from '../../types';

export const aniviewVideoAdPlayerTechnologyDefinition = {
	id: "aniview-video-ad-player",
	name: "Aniview Video Ad Player",
	website: "https://aniview.com/video-ad-player/",
	description: "Aniview Video Ad Player is a video player technology developed by Aniview, a company that specialises in providing video advertising solutions.",
	icon: "Aniview.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "aniview-video-ad-player:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("player\\.aniview\\.com\\/script\\/([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aniview-video-ad-player:dom:1",
			kind: "dom",
			selector: "link[href*='player.aniview.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"aniview-ad-server",
	],
} as const satisfies TechnologyDefinition;
