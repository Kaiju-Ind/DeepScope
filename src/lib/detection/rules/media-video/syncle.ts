import type { TechnologyDefinition } from '../../types';

export const syncleTechnologyDefinition = {
	id: "syncle",
	name: "Syncle",
	website: "https://syncle.com",
	description: "Syncle is a tool that automatically integrates relevant product video reviews from YouTube into online shops.",
	icon: "Syncle.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "syncle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.videoly\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "syncle:jsGlobal:1",
			kind: "jsGlobal",
			property: "VideolyWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
