import type { TechnologyDefinition } from '../../types';

export const idosellShopTechnologyDefinition = {
	id: "idosell-shop",
	name: "IdoSell Shop",
	website: "https://www.idosell.com",
	description: "IdoSell Shop is a fully functional ecommerce software platform.",
	icon: "idosellshop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "idosell-shop:jsGlobal:0",
			kind: "jsGlobal",
			property: "IAI_Ajax",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "idosell-shop:dom:1",
			kind: "dom",
			selector: "div[id*='idosell_logo'] > a[href*='www.idosell.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
