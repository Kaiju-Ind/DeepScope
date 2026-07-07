import type { TechnologyDefinition } from '../../types';

export const booksyTechnologyDefinition = {
	id: "booksy",
	name: "Booksy",
	website: "https://booksy.com/",
	description: "Booksy is a booking system for people looking to schedule appointments for health and beauty services.",
	icon: "Booksy.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "booksy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("booksy\\.com\\/widget\\/code\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "booksy:jsGlobal:1",
			kind: "jsGlobal",
			property: "booksy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
