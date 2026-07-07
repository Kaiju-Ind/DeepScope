import type { TechnologyDefinition } from '../../types';

export const ipaperTechnologyDefinition = {
	id: "ipaper",
	name: "iPaper",
	website: "https://www.ipaper.io",
	description: "iPaper is a platform that converts printed materials into interactive digital catalogs designed to enhance customer engagement and support sales.",
	icon: "iPaper.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "ipaper:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embeds\\.ipaper\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ipaper:jsGlobal:1",
			kind: "jsGlobal",
			property: "iPaper.API",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ipaper:jsGlobal:2",
			kind: "jsGlobal",
			property: "iPaperDebugger",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
