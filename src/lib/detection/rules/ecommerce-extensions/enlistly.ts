import type { TechnologyDefinition } from '../../types';

export const enlistlyTechnologyDefinition = {
	id: "enlistly",
	name: "Enlistly",
	website: "https://enlistly.com",
	description: "Enlistly tracks referral orders in realtime. Orders that are partially refunded, refunded, or cancelled update on the fly.",
	icon: "Enlistly.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "enlistly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.enlistly\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
