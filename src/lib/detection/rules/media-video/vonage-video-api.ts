import type { TechnologyDefinition } from '../../types';

export const vonageVideoApiTechnologyDefinition = {
	id: "vonage-video-api",
	name: "Vonage Video API",
	website: "https://www.vonage.com/communications-apis/video/",
	description: "Vonage Video API platform makes it easy to embed real-time, high-quality interactive video, messaging, screen-sharing, and more into web and mobile apps.",
	icon: "Vonage.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "vonage-video-api:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.opentok\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
