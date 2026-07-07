import type { TechnologyDefinition } from '../../types';

export const foodOrderingCoUkTechnologyDefinition = {
	id: "food-ordering-co-uk",
	name: "Food-Ordering.co.uk",
	website: "https://www.food-ordering.co.uk",
	description: "Food-Ordering.co.uk is a multi-lingual food ordering system for several hospitality scenarios including online ordering for delivery/takeout, in-store ordering (order at table, room service, self ordering kiosk), telephone ordering with callerID, and table booking.",
	icon: "Food-Ordering.co.uk.png",
	categories: [
		"platform-cms-builder",
		"booking-scheduling",
	],
	rules: [
		{
			id: "food-ordering-co-uk:jsGlobal:0",
			kind: "jsGlobal",
			property: "GetOrderAcceptFor",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "food-ordering-co-uk:jsGlobal:1",
			kind: "jsGlobal",
			property: "StoreToC",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "food-ordering-co-uk:jsGlobal:2",
			kind: "jsGlobal",
			property: "disablecollection",
			valuePattern: new RegExp("No"),
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "food-ordering-co-uk:jsGlobal:3",
			kind: "jsGlobal",
			property: "disabledelivery",
			valuePattern: new RegExp("No"),
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"bootstrap",
		"google-maps",
		"microsoft-asp-net",
		"plesk",
	],
} as const satisfies TechnologyDefinition;
