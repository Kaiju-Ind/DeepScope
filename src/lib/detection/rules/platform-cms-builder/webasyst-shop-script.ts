import type { TechnologyDefinition } from '../../types';

export const webasystShopScriptTechnologyDefinition = {
	id: "webasyst-shop-script",
	name: "Webasyst Shop-Script",
	website: "https://www.shop-script.com",
	description: "Webasyst Shop-Script is a feature-rich PHP ecommerce framework and shopping cart solution.",
	icon: "Webasyst Shop-Script.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webasyst-shop-script:jsGlobal:0",
			kind: "jsGlobal",
			property: "shopOrdercallConfigStaticUrl",
			valuePattern: new RegExp("\\/wa-apps\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webasyst-shop-script:jsGlobal:1",
			kind: "jsGlobal",
			property: "shop_cityselect.lib",
			valuePattern: new RegExp("\\/wa-apps\\/"),
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
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
