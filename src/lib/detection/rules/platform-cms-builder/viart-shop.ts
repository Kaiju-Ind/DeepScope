import type { TechnologyDefinition } from '../../types';

export const viartShopTechnologyDefinition = {
	id: "viart-shop",
	name: "ViArt Shop",
	website: "https://www.viart.com",
	description: "ViArt Shop is a PHP-based shopping cart solution that includes a content management system (CMS) and integrated helpdesk functionality.",
	icon: "ViArtShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "viart-shop:dom:0",
			kind: "dom",
			selector: "a[href*='www.viart.com'] > img[title*='ViArt - PHP Shopping Cart']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "viart-shop:jsGlobal:1",
			kind: "jsGlobal",
			property: "viartData.init_ts",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "viart-shop:jsGlobal:2",
			kind: "jsGlobal",
			property: "viartDataAppend",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
