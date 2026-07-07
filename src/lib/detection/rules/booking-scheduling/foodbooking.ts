import type { TechnologyDefinition } from '../../types';

export const foodbookingTechnologyDefinition = {
	id: "foodbooking",
	name: "FoodBooking",
	website: "https://www.foodbooking.com",
	description: "FoodBooking is a virtual food court based on a curated list of restaurants that use the GloriaFood ordering system.",
	icon: "FoodBooking.png",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "foodbooking:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.(?:fbgcdn|foodbooking)\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "foodbooking:dom:1",
			kind: "dom",
			selector: "a[href*='.foodbooking.com/ordering/restaurant/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
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
	implies: [
		"gloriafood",
	],
} as const satisfies TechnologyDefinition;
