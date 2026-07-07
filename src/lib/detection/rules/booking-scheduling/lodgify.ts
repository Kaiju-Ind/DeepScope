import type { TechnologyDefinition } from '../../types';

export const lodgifyTechnologyDefinition = {
	id: "lodgify",
	name: "Lodgify",
	website: "https://www.lodgify.com",
	description: "Lodgify is a platform facilitating vacation rentals and bookings.",
	icon: "Lodgify.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "lodgify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lodgify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
