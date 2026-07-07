import type { TechnologyDefinition } from '../../types';

export const pictureparkTechnologyDefinition = {
	id: "picturepark",
	name: "Picturepark",
	website: "https://picturepark.com",
	description: "Picturepark is designed to facilitate your DAM policies by storing, tagging, searching and delivering files in an automated and controlled way.",
	icon: "Picturepark.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "picturepark:dom:0",
			kind: "dom",
			selector: "img[data-name*='Picturepark'], img[data-srcset*='picturepark'], div[style*='picturepark'], source[srcset*='picturepark']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "picturepark:jsGlobal:1",
			kind: "jsGlobal",
			property: "pictureparkConfiguration",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
