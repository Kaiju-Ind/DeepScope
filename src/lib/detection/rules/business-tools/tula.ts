import type { TechnologyDefinition } from '../../types';

export const tulaTechnologyDefinition = {
	id: "tula",
	name: "Tula",
	website: "https://tulasoftware.com",
	description: "Tula is a web-based yoga studio software facilitating management of payments, memberships, calendar sharing, registrations, credit tracking, attendance recording, and more for studio owners.",
	icon: "TulaSoftware.svg",
	categories: [
		"business-tools",
		"booking-scheduling",
	],
	rules: [
		{
			id: "tula:jsGlobal:0",
			kind: "jsGlobal",
			property: "Tula",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tula:jsGlobal:1",
			kind: "jsGlobal",
			property: "TulaSpinner",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tula:jsGlobal:2",
			kind: "jsGlobal",
			property: "TulaUtil",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tula:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_tulayoga_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
