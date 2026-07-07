import type { TechnologyDefinition } from '../../types';

export const keapTechnologyDefinition = {
	id: "keap",
	name: "Keap",
	website: "https://keap.com",
	description: "Keap offers an email marketing and sales platform for small businesses, including products to manage customers, customer relationship management, marketing, and ecommerce.",
	icon: "Keap.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "keap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.infusionsoft\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "keap:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("property\\.infusionsoft\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "keap:dom:2",
			kind: "dom",
			selector: "form[action*='property.infusionsoft.com'], link[href*='.infusionsoft.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
