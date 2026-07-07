import type { TechnologyDefinition } from '../../types';

export const layersTechnologyDefinition = {
	id: "layers",
	name: "Layers",
	website: "https://www.uselayers.com/",
	description: "Layers is a site search and merchandising platform designed to help ecommerce.",
	icon: "Layers.png",
	categories: [
		"search",
	],
	rules: [
		{
			id: "layers:jsGlobal:0",
			kind: "jsGlobal",
			property: "Layers",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
