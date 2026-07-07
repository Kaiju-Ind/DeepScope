import type { TechnologyDefinition } from '../../types';

export const webShopManagerTechnologyDefinition = {
	id: "web-shop-manager",
	name: "Web Shop Manager",
	website: "https://webshopmanager.com",
	description: "Web Shop Manager is an ecommerce and search platform for the automotive industry and markets with complex product catalogs.",
	icon: "Web Shop Manager.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "web-shop-manager:jsGlobal:0",
			kind: "jsGlobal",
			property: "WSM.Tracking",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "web-shop-manager:jsGlobal:1",
			kind: "jsGlobal",
			property: "WSM_CHART_COLORS_OPAQUE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "web-shop-manager:jsGlobal:2",
			kind: "jsGlobal",
			property: "wsmHideHelpBox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "web-shop-manager:jsGlobal:3",
			kind: "jsGlobal",
			property: "wsm_catalogTabby",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
