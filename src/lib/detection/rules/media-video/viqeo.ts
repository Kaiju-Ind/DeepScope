import type { TechnologyDefinition } from '../../types';

export const viqeoTechnologyDefinition = {
	id: "viqeo",
	name: "Viqeo",
	website: "https://viqeo.tv",
	description: "Viqeo is a short video platform to make media and ecommerce more visual and interesting.",
	icon: "Viqeo.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "viqeo:jsGlobal:0",
			kind: "jsGlobal",
			property: "VIQEO",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
