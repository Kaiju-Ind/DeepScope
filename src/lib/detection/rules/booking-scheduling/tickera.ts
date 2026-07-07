import type { TechnologyDefinition } from '../../types';

export const tickeraTechnologyDefinition = {
	id: "tickera",
	name: "Tickera",
	website: "https://tickera.com",
	description: "Tickera is a WordPress plugin that enables event organizers to sell tickets directly from their websites.",
	icon: "Tickera.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "tickera:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/tickera\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:tickera:tickera:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
