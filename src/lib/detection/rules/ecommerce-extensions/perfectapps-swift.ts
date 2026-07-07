import type { TechnologyDefinition } from '../../types';

export const perfectappsSwiftTechnologyDefinition = {
	id: "perfectapps-swift",
	name: "PerfectApps Swift",
	website: "https://apps.shopify.com/swift",
	description: "Swift is a page speed solution for ecommerce store owners built by PerfectApps.",
	icon: "PerfectApps Swift.png",
	categories: [
		"ecommerce-extensions",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "perfectapps-swift:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("swift\\.perfectapps\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "perfectapps-swift:jsGlobal:1",
			kind: "jsGlobal",
			property: "ps_apiURI",
			valuePattern: new RegExp("swift-api\\.perfectapps\\.io\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "perfectapps-swift:jsGlobal:2",
			kind: "jsGlobal",
			property: "ps_storeUrl",
			valuePattern: new RegExp("swift\\.perfectapps\\.io"),
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
