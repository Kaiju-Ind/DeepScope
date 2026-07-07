import type { TechnologyDefinition } from '../../types';

export const tiktokPixelTechnologyDefinition = {
	id: "tiktok-pixel",
	name: "TikTok Pixel",
	website: "https://ads.tiktok.com",
	icon: "TikTok.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "tiktok-pixel:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("analytics\\.tiktok\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "tiktok-pixel:dom:1",
			kind: "dom",
			selector: "script[data-hid='tiktok']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tiktok-pixel:jsGlobal:2",
			kind: "jsGlobal",
			property: "TiktokAnalyticsObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tiktok-pixel:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("_tiktok_sdkid"),
			description: "Script content contains a bounded technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
