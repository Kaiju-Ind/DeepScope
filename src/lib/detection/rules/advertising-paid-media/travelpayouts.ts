import type { TechnologyDefinition } from '../../types';

export const travelpayoutsTechnologyDefinition = {
	id: "travelpayouts",
	name: "TravelPayouts",
	website: "https://www.travelpayouts.com",
	description: "TravelPayouts is a global affiliate network that helps monetize travel-related web traffic through partnerships with airlines, hotels, and other travel service providers.",
	icon: "TravelPayouts.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "travelpayouts:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.travelpayouts\\.com"),
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
