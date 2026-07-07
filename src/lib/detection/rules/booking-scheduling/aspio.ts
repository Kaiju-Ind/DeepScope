import type { TechnologyDefinition } from '../../types';

export const aspioTechnologyDefinition = {
	id: "aspio",
	name: "Aspio",
	website: "https://aspio.io",
	description: "Aspio is a platform that streamlines bookings and manages sales.",
	icon: "Aspio.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "aspio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/aspio-io-customer\\/public\\/js\\/aspio-io-customer-public\\.js"),
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
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
