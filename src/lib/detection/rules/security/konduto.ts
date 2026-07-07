import type { TechnologyDefinition } from '../../types';

export const kondutoTechnologyDefinition = {
	id: "konduto",
	name: "Konduto",
	website: "https://www.konduto.com",
	description: "Konduto is a fraud detection service for ecommerce.",
	icon: "Konduto.png",
	categories: [
		"security",
	],
	rules: [
		{
			id: "konduto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.k-analytix\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "konduto:dom:1",
			kind: "dom",
			selector: "link[href*='.konduto.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "konduto:jsGlobal:2",
			kind: "jsGlobal",
			property: "Konduto",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "konduto:jsGlobal:3",
			kind: "jsGlobal",
			property: "getKondutoID",
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
