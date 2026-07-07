import type { TechnologyDefinition } from '../../types';

export const quinbookTechnologyDefinition = {
	id: "quinbook",
	name: "QuinBook",
	website: "https://quinbook.com",
	description: "QuinBook is a booking and management platform for the leisure and events industry.",
	icon: "QuinBook.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "quinbook:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.quinbook\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
