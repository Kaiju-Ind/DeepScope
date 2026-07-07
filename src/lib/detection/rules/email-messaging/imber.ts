import type { TechnologyDefinition } from '../../types';

export const imberTechnologyDefinition = {
	id: "imber",
	name: "Imber",
	website: "https://imber.live",
	description: "Imber is an all-in-one marketing automation platform built for customer support (live chat), sales, and marketing.",
	icon: "Imber.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "imber:jsGlobal:0",
			kind: "jsGlobal",
			property: "$imber.getVisitor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "imber:jsGlobal:1",
			kind: "jsGlobal",
			property: "IMBER_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "imber:jsGlobal:2",
			kind: "jsGlobal",
			property: "IMBER_SOCKET",
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
