import type { TechnologyDefinition } from '../../types';

export const thronTechnologyDefinition = {
	id: "thron",
	name: "THRON",
	website: "https://www.thron.com",
	description: "THRON is a digital asset management platform that provides a centralised hub for storing, organising, and distributing digital assets like images, videos, and documents.",
	icon: "THRON.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "thron:dom:0",
			kind: "dom",
			selector: "link[href*='.thron.com/'], img[src*='.thron.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "thron:jsGlobal:1",
			kind: "jsGlobal",
			property: "THRONPlayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "thron:jsGlobal:2",
			kind: "jsGlobal",
			property: "thronHlsJs",
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
