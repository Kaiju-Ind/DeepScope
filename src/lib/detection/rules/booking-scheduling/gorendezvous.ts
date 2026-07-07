import type { TechnologyDefinition } from '../../types';

export const gorendezvousTechnologyDefinition = {
	id: "gorendezvous",
	name: "GOrendezvous",
	website: "https://gorendezvous.com",
	description: "GOrendezvous is an online scheduling and appointment booking software for managing availability, bookings, and calendar coordination across services and users.",
	icon: "GOrendezvous.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "gorendezvous:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.gorendezvous\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
