import type { TechnologyDefinition } from '../../types';

export const videolyTechnologyDefinition = {
	id: "videoly",
	name: "Videoly",
	website: "https://videoly.co",
	description: "Videoly is a tool that automatically integrates relevant product video reviews from YouTube into online shops.",
	icon: "Videoly.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "videoly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.videoly\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "videoly:jsGlobal:1",
			kind: "jsGlobal",
			property: "VideolyWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
