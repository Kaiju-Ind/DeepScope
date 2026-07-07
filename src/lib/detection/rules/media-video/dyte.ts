import type { TechnologyDefinition } from '../../types';

export const dyteTechnologyDefinition = {
	id: "dyte",
	name: "Dyte",
	website: "https://dyte.io",
	description: "Dyte is a developer-friendly, real-time audio and video communication software development kit (SDK).",
	icon: "Dyte.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "dyte:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.dyte-client-selfVideo"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "dyte:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("cdn\\.dyte\\.in\\/"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "dyte:jsGlobal:2",
			kind: "jsGlobal",
			property: "triggerDyteRecording",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
	implies: [
		"webrtc",
	],
} as const satisfies TechnologyDefinition;
