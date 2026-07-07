import type { TechnologyDefinition } from '../../types';

export const velloTechnologyDefinition = {
	id: "vello",
	name: "Vello",
	website: "https://www.vello.fi",
	description: "Vello is an online booking tool that automates business bookings.",
	icon: "Vello.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "vello:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.vello\\.fi\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
