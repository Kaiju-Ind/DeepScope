import type { TechnologyDefinition } from '../../types';

export const bookatableTechnologyDefinition = {
	id: "bookatable",
	name: "Bookatable",
	website: "https://www.bookatable.co.uk",
	description: "Bookatable is a restaurant table booking widget.",
	icon: "Bookatable.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bookatable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bda\\.bookatable\\.com\\/deploy\\/lbui\\.direct\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
