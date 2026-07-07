import type { TechnologyDefinition } from '../../types';

export const fastBundleTechnologyDefinition = {
	id: "fast-bundle",
	name: "Fast Bundle",
	website: "https://fastbundle.co",
	description: "Fast Bundle gives you the ability to create product bundle offers with discounts.",
	icon: "Fast Bundle.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "fast-bundle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.fastbundle\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fast-bundle:jsGlobal:1",
			kind: "jsGlobal",
			property: "FastBundleConf.bundleBox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fast-bundle:jsGlobal:2",
			kind: "jsGlobal",
			property: "FastBundleConf.cartInfo.app_version",
			valuePattern: new RegExp("v([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
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
