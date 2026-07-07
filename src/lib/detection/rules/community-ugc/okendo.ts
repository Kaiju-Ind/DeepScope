import type { TechnologyDefinition } from '../../types';

export const okendoTechnologyDefinition = {
	id: "okendo",
	name: "Okendo",
	website: "https://www.okendo.io",
	description: "Okendo is a customer marketing platform with product ratings and reviews, customer photos and videos to help personalise experiences.",
	icon: "Okendo.svg",
	categories: [
		"community-ugc",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "okendo:dom:0",
			kind: "dom",
			selector: "div.okeReviews",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "okendo:jsGlobal:1",
			kind: "jsGlobal",
			property: "okeReviewsWidgetOnInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "okendo:jsGlobal:2",
			kind: "jsGlobal",
			property: "okeWidgetControlInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "okendo:jsGlobal:3",
			kind: "jsGlobal",
			property: "okendoReviews",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "okendo:jsGlobal:4",
			kind: "jsGlobal",
			property: "okeWidgetApi",
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
