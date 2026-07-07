import type { TechnologyDefinition } from '../../types';

export const bookdinnersTechnologyDefinition = {
	id: "bookdinners",
	name: "BookDinners",
	website: "https://www.bookdinners.nl",
	description: "BookDinners is a restaurant table booking widget.",
	icon: "BookDinners.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bookdinners:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bookdinners\\.nl\\/widget\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
