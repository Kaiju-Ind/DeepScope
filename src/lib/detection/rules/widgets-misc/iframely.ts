import type { TechnologyDefinition } from '../../types';

export const iframelyTechnologyDefinition = {
	id: "iframely",
	name: "Iframely",
	website: "https://iframely.com",
	description: "Iframely is a uniform delivery service for rich media embeds and URL metadata across various platforms.",
	icon: "Iframely.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "iframely:jsGlobal:0",
			kind: "jsGlobal",
			property: "iframely.ASPECT_WRAPPER_CLASS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "iframely:jsGlobal:1",
			kind: "jsGlobal",
			property: "loadIframelyEmbedJs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
