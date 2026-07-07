import type { TechnologyDefinition } from '../../types';

export const carroTechnologyDefinition = {
	id: "carro",
	name: "Carro",
	website: "https://getcarro.com",
	description: "Carro connects participating Shopify stores together to enable cross-store selling or the ability for like-minded partners to directly sell each other products without the need for inventory, managing returns, or minimum order quantities.",
	icon: "Carro.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "carro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getcarro\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "carro:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/carro\\.min\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
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
