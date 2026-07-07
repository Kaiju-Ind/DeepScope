import type { TechnologyDefinition } from '../../types';

export const youcamMakeupTechnologyDefinition = {
	id: "youcam-makeup",
	name: "YouCam Makeup",
	website: "https://www.perfectcorp.com/business/products/virtual-makeup",
	description: "YouCam Makeup is a cross-platform virtual makeup solution for omnichannel ecommerce.",
	icon: "YouCam Makeup.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "youcam-makeup:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("plugins-media\\.(?:perfectcorp|makeupar)\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "youcam-makeup:jsGlobal:1",
			kind: "jsGlobal",
			property: "YMK.applyMakeupByLook",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "youcam-makeup:jsGlobal:2",
			kind: "jsGlobal",
			property: "YMK.calDeltaE",
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
