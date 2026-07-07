import type { TechnologyDefinition } from '../../types';

export const uplynkTechnologyDefinition = {
	id: "uplynk",
	name: "Uplynk",
	website: "https://www.uplynk.com",
	description: "Uplynk is a video streaming platform that provides tools for live and on-demand video delivery, including encoding, transcoding, and content management.",
	icon: "Uplynk.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "uplynk:dom:0",
			kind: "dom",
			selector: "video[src*='.uplynk.com/'], img[data-thumbnailurl*='.uplynk.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "uplynk:jsGlobal:1",
			kind: "jsGlobal",
			property: "UPLYNK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "uplynk:jsGlobal:2",
			kind: "jsGlobal",
			property: "_uplynk_async_wget2_data",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "uplynk:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.uplynk\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"high",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
