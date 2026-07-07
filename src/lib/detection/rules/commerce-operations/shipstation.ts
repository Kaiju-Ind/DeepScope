import type { TechnologyDefinition } from '../../types';

export const shipstationTechnologyDefinition = {
	id: "shipstation",
	name: "ShipStation",
	website: "https://www.shipstation.com",
	description: "ShipStation is a web-based shipping software designed to help ecommerce businesses streamline their shipping processes. It allows businesses to import, manage, and ship their orders from multiple sales channels, including marketplaces, shopping carts, and ecommerce platforms.",
	icon: "ShipStation.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "shipstation:url:0",
			kind: "url",
			pattern: new RegExp("track\\.shipstation\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "shipstation:dom:1",
			kind: "dom",
			selector: "a[href*='//track.shipstation.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
