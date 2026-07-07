import type { TechnologyDefinition } from '../../types';

export const vidjetTechnologyDefinition = {
	id: "vidjet",
	name: "Vidjet",
	website: "https://www.vidjet.com",
	description: "Vidjet is a shoppable-video platform designed for modern ecommerce stores, allowing videos to be embedded on websites and triggered based on visitor actions.",
	icon: "Vidjet.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "vidjet:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app-api\\.vidjet\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "vidjet:jsGlobal:1",
			kind: "jsGlobal",
			property: "Vidjet.init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
