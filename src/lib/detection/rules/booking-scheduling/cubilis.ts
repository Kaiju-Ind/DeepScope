import type { TechnologyDefinition } from '../../types';

export const cubilisTechnologyDefinition = {
	id: "cubilis",
	name: "Cubilis",
	website: "https://www.cubilis.com",
	description: "Cubilis is a management and reservation system for all types of accommodation, such as hotels, B&Bs and hostels.",
	icon: "Cubilis.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "cubilis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.cubilis\\.eu\\/"),
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
