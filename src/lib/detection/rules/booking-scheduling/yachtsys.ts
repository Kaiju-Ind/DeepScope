import type { TechnologyDefinition } from '../../types';

export const yachtsysTechnologyDefinition = {
	id: "yachtsys",
	name: "YachtSys",
	website: "https://www.yachtsys.com",
	description: "YachtSys is a booking management system.",
	icon: "YachtSys.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "yachtsys:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("apps\\.yachtsys\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
