import type { TechnologyDefinition } from '../../types';

export const koobcampTechnologyDefinition = {
	id: "koobcamp",
	name: "KoobCamp",
	website: "https://www.koobcamp.com/en/home-page",
	description: "KoobCamp is a provider of camping, village, and glamping holiday solutions.",
	icon: "KoobCamp.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "koobcamp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.koobcamp\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "koobcamp:jsGlobal:1",
			kind: "jsGlobal",
			property: "KOOBCAMP_WIDGETS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "koobcamp:jsGlobal:2",
			kind: "jsGlobal",
			property: "KoobCampWidgets",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
