import type { TechnologyDefinition } from '../../types';

export const dividebuyTechnologyDefinition = {
	id: "dividebuy",
	name: "DivideBuy",
	website: "https://dividebuy.co.uk/",
	description: "Dividebuy provides retailer financing solutions.",
	icon: "DivideBuy.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "dividebuy:dom:0",
			kind: "dom",
			selector: "div[class*='dividebuy-softcredit']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "dividebuy:jsGlobal:1",
			kind: "jsGlobal",
			property: "display_dividebuy_modal",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
