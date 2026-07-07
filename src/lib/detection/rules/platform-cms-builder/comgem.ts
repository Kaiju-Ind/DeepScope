import type { TechnologyDefinition } from '../../types';

export const comgemTechnologyDefinition = {
	id: "comgem",
	name: "Comgem",
	website: "https://www.comgem.com",
	description: "Comgen is a B2B ecommerce platform that facilitates transactions and interactions between businesses through a digital marketplace.",
	icon: "Comgem.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "comgem:jsGlobal:0",
			kind: "jsGlobal",
			property: "comgem.activateCarousels",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "comgem:jsGlobal:1",
			kind: "jsGlobal",
			property: "comgemTrack",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "comgem:header:2",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Comgem$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "comgem:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^comgem$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
