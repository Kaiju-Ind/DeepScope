import type { TechnologyDefinition } from '../../types';

export const vdocipherTechnologyDefinition = {
	id: "vdocipher",
	name: "VdoCipher",
	website: "https://www.vdocipher.com",
	description: "VdoCipher is a secure video hosting and DRM streaming platform.",
	icon: "VdoCipher.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "vdocipher:dom:0",
			kind: "dom",
			selector: "iframe[src*='player.vdocipher.com/v2/'][allow*='encrypted-media']",
			description: "DOM selector matches a known technology marker.",
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
