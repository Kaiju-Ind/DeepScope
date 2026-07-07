import type { TechnologyDefinition } from '../../types';

export const flipdishTechnologyDefinition = {
	id: "flipdish",
	name: "Flipdish",
	website: "https://www.flipdish.com",
	description: "Flipdish is an all-in-one technology solution designed to streamline restaurant operations.",
	icon: "Flipdish.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "flipdish:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.web\\.flipdish\\.com\\/"),
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
