import type { TechnologyDefinition } from '../../types';

export const ridebitsTechnologyDefinition = {
	id: "ridebits",
	name: "RideBits",
	website: "https://ridebits.com",
	description: "RideBits is a provider of trip booking apps for ground transportation companies, offering solutions for managing bookings.",
	icon: "RideBits.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "ridebits:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ridebitsapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
