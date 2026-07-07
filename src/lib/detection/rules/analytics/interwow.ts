import type { TechnologyDefinition } from '../../types';

export const interwowTechnologyDefinition = {
	id: "interwow",
	name: "Interwow",
	website: "https://interwow.com",
	description: "Interwow is a user behavior analytics platform that collects and analyzes user interaction data to understand behavior patterns and measure engagement across digital products.",
	icon: "Interwow.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "interwow:jsGlobal:0",
			kind: "jsGlobal",
			property: "Interwow.trackConversion",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "interwow:jsGlobal:1",
			kind: "jsGlobal",
			property: "InterwowToken",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "interwow:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^interwow_session$", "i"),
			description: "Cookie name matches a known technology marker.",
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
