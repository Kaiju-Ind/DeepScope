import type { TechnologyDefinition } from '../../types';

export const hostmeappTechnologyDefinition = {
	id: "hostmeapp",
	name: "Hostmeapp",
	website: "https://www.hostmeapp.com",
	description: "Hostmeapp is an restaurant software. Includes reservation, waitlist, guestbook and marketing tools.",
	icon: "Hostmeapp.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "hostmeapp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tables\\.hostmeapp\\.com"),
			description: "Script source URL matches a known technology marker.",
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
