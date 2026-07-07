import type { TechnologyDefinition } from '../../types';

export const mewsTechnologyDefinition = {
	id: "mews",
	name: "Mews",
	website: "https://www.mews.com",
	description: "Mews is a hospitalitions service that enables hotels to track their bookings.",
	icon: "Mews.png",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "mews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mews\\.li\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mews:dom:1",
			kind: "dom",
			selector: "a[href*='.mews.li/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mews:jsGlobal:2",
			kind: "jsGlobal",
			property: "Mews",
			description: "Page-owned global matches a known technology marker.",
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
