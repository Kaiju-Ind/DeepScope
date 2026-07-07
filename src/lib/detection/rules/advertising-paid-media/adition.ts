import type { TechnologyDefinition } from '../../types';

export const aditionTechnologyDefinition = {
	id: "adition",
	name: "Adition",
	website: "https://www.adition.com",
	description: "Adition is a provider of programmatic advertising solutions.",
	icon: "Adition.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adition:dom:0",
			kind: "dom",
			selector: "link[href*='.adition.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "adition:jsGlobal:1",
			kind: "jsGlobal",
			property: "adition",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adition:jsGlobal:2",
			kind: "jsGlobal",
			property: "initialize_adition",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
