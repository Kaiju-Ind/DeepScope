import type { TechnologyDefinition } from '../../types';

export const aprimoTechnologyDefinition = {
	id: "aprimo",
	name: "Aprimo",
	website: "https://www.aprimo.com",
	description: "Aprimo is a United States-based company that develops and sells marketing automation software and digital asset management technology.",
	icon: "Aprimo.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "aprimo:dom:0",
			kind: "dom",
			selector: "source[data-srcset*='/media/aprimo'], img[data-src*='/media/Aprimo'], img[src*='aprimo']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "aprimo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Aprimo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
