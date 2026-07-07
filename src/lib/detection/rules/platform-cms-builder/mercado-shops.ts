import type { TechnologyDefinition } from '../../types';

export const mercadoShopsTechnologyDefinition = {
	id: "mercado-shops",
	name: "Mercado Shops",
	website: "https://www.mercadoshops.com",
	description: "Mercado Shops is an all-in-one ecommerce platform.",
	icon: "Mercado Shops.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mercado-shops:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("frontend-assets\\/mshops-web-home\\/vendor"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mercado-shops:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_mshops_ga_gid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "mercado-shops:dom:2",
			kind: "dom",
			selector: "link[href*='.mercadolibre.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mercado-shops:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("frontend-assets\\/mshops-web-home\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mercado-shops:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^_mshops_ga$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "mercado-shops:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^_mshops_ga_cid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
