import type { TechnologyDefinition } from '../../types';

export const barionTechnologyDefinition = {
	id: "barion",
	name: "Barion",
	website: "https://www.barion.com",
	description: "Barion is a payment gateway and card acceptance system facilitating secure online transactions for businesses and consumers.",
	icon: "Barion.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "barion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pixel\\.barion\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "barion:jsGlobal:1",
			kind: "jsGlobal",
			property: "BarionAnalyticsObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "barion:jsGlobal:2",
			kind: "jsGlobal",
			property: "barion_pixel_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
