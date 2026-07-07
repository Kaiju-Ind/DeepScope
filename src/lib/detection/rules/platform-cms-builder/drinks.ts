import type { TechnologyDefinition } from '../../types';

export const drinksTechnologyDefinition = {
	id: "drinks",
	name: "Drinks",
	website: "https://drinks.com",
	description: "Drinks is a real-time tax and regulatory solution that helps wineries and retailers scale online sales while integrating seamlessly with Shopify's native checkout experience.",
	icon: "Drinks.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "drinks:dom:0",
			kind: "dom",
			selector: "link[href*='/drinks_base.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "drinks:jsGlobal:1",
			kind: "jsGlobal",
			property: "drinks.checkId",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
