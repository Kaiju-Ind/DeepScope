import type { TechnologyDefinition } from '../../types';

export const videoGreetTechnologyDefinition = {
	id: "video-greet",
	name: "Video Greet",
	website: "https://apps.shopify.com/videogreet-gift-messages",
	description: "Video Greet lets your customers add a video message to gifts with QR codes.",
	icon: "Video Greet.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "video-greet:jsGlobal:0",
			kind: "jsGlobal",
			property: "__vg.video_greet_button_src",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
