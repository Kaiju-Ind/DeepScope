import type { TechnologyDefinition } from '../../types';

export const helixoUfeTechnologyDefinition = {
	id: "helixo-ufe",
	name: "Helixo UFE",
	website: "https://helixo.co/upsell-funnel-engine/",
	description: "Helixo UFE is a lightweight Shopify upsell sales funnel app.",
	icon: "Helixo.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "helixo-ufe:jsGlobal:0",
			kind: "jsGlobal",
			property: "ufe.funnelData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "helixo-ufe:jsGlobal:1",
			kind: "jsGlobal",
			property: "ufeStore.cartTotal",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
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
