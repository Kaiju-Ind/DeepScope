import type { TechnologyDefinition } from '../../types';

export const vidazooTechnologyDefinition = {
	id: "vidazoo",
	name: "Vidazoo",
	website: "https://www.vidazoo.com",
	description: "Vidazoo is a video content and yield management platform.",
	icon: "Vidazoo.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "vidazoo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.vidazoo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vidazoo:jsGlobal:1",
			kind: "jsGlobal",
			property: "__vidazooPlayer__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vidazoo:jsGlobal:2",
			kind: "jsGlobal",
			property: "vidazoo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vidazoo:jsGlobal:3",
			kind: "jsGlobal",
			property: "vidazoo.version",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
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
