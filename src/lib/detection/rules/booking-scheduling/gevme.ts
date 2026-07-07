import type { TechnologyDefinition } from '../../types';

export const gevmeTechnologyDefinition = {
	id: "gevme",
	name: "Gevme",
	website: "https://www.gevme.com",
	description: "Gevme is an omnichannel event management platform designed to streamline planning, coordination, and execution across physical, virtual, and hybrid events.",
	icon: "Gevme.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "gevme:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.gevme\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gevme:jsGlobal:1",
			kind: "jsGlobal",
			property: "GEVME.analytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gevme:jsGlobal:2",
			kind: "jsGlobal",
			property: "GevmeActivityFeed",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gevme:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^GEVME Analytics$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "gevme:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^gevme analytics$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
