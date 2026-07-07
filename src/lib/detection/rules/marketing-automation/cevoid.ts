import type { TechnologyDefinition } from '../../types';

export const cevoidTechnologyDefinition = {
	id: "cevoid",
	name: "Cevoid",
	website: "https://cevoid.com",
	description: "Cevoid is an all-in-one user-generated content (UGC) platform designed for e-commerce brands.",
	icon: "Cevoid.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "cevoid:jsGlobal:0",
			kind: "jsGlobal",
			property: "cevoid.galleries",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cevoid:jsGlobal:1",
			kind: "jsGlobal",
			property: "cevoid_gallery.load",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cevoid:jsGlobal:2",
			kind: "jsGlobal",
			property: "cevoid_state.setSessionCookie",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
