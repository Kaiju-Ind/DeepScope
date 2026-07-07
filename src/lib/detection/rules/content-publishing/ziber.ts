import type { TechnologyDefinition } from '../../types';

export const ziberTechnologyDefinition = {
	id: "ziber",
	name: "Ziber",
	website: "https://ziber.eu",
	description: "Ziber is an education platform that connects professionals, educators, and organizations involved in childcare and primary education through a centralized digital ecosystem.",
	icon: "Ziber.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "ziber:jsGlobal:0",
			kind: "jsGlobal",
			property: "ZiberTracker.getTracker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ziber:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ZIBER$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ziber:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ziber$", "i"),
			description: "Meta tag matches a known technology marker.",
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
