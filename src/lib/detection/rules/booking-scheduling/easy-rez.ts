import type { TechnologyDefinition } from '../../types';

export const easyRezTechnologyDefinition = {
	id: "easy-rez",
	name: "Easy Rez",
	website: "https://www.easy-rez.com",
	description: "Easy Rez is a hotel property management and booking system designed to streamline reservations, room management, and guest services.",
	icon: "EasyRez.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "easy-rez:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.easy-rez\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "easy-rez:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Easy-Rez$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "easy-rez:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^easy-rez$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
