import type { TechnologyDefinition } from '../../types';

export const verifone2checkoutTechnologyDefinition = {
	id: "verifone-2checkout",
	name: "Verifone 2Checkout",
	website: "https://www.2checkout.com",
	description: "Verifone is an American multinational corporation headquartered in Coral Springs, Florida, that provides technology for electronic payment transactions and value-added services at the point-of-sale.",
	icon: "Verifone.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "verifone-2checkout:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("2checkout\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "verifone-2checkout:dom:1",
			kind: "dom",
			selector: "#order__processedby",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "verifone-2checkout:text:2",
			kind: "text",
			pattern: new RegExp("2Checkout"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "verifone-2checkout:dom:3",
			kind: "dom",
			selector: "link[href*='.2checkout.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
