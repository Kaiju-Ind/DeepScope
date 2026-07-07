import type { TechnologyDefinition } from '../../types';

export const stnVideoTechnologyDefinition = {
	id: "stn-video",
	name: "STN Video",
	website: "https://www.stnvideo.com",
	description: "STN Video is an online video platform that solves digital video for publishers, content creators, and advertisers.",
	icon: "STN Video.png",
	categories: [
		"advertising-paid-media",
		"media-video",
	],
	rules: [
		{
			id: "stn-video:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.sendtonews\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "stn-video:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("embed\\.sendtonews\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
