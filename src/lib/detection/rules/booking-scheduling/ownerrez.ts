import type { TechnologyDefinition } from '../../types';

export const ownerrezTechnologyDefinition = {
	id: "ownerrez",
	name: "OwnerRez",
	website: "https://www.ownerrez.com",
	description: "OwnerRez is a vacation rental software platform that provides property managers with tools to manage bookings, guest communications, and property operations from a centralized system.",
	icon: "OwnerRez.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "ownerrez:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ownerrez\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
