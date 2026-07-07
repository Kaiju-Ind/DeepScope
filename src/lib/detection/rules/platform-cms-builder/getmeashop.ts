import type { TechnologyDefinition } from '../../types';

export const getmeashopTechnologyDefinition = {
	id: "getmeashop",
	name: "GetMeAShop",
	website: "https://www.getmeashop.com",
	description: "GetMeAShop is a cloud-based ecommerce solution for small and midsize businesses across industries such as retail and manufacturing.",
	icon: "GetMeAShop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "getmeashop:dom:0",
			kind: "dom",
			selector: "link[href*='.getmeashop.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "getmeashop:jsGlobal:1",
			kind: "jsGlobal",
			property: "gmas_base_url",
			valuePattern: new RegExp("'\\.getmeashop\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "getmeashop:jsGlobal:2",
			kind: "jsGlobal",
			property: "search_api_base_uri",
			valuePattern: new RegExp("search\\.getmeashop\\.com"),
			description: "Page-owned global matches a known technology marker.",
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
