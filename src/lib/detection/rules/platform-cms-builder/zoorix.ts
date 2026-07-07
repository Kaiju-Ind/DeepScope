import type { TechnologyDefinition } from '../../types';

export const zoorixTechnologyDefinition = {
	id: "zoorix",
	name: "Zoorix",
	website: "https://www.zoorix.com",
	description: "Zoorix is a tool that helps businesses increase revenue by facilitating upselling and cross-selling.",
	icon: "Zoorix.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zoorix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.zoorix\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zoorix:jsGlobal:1",
			kind: "jsGlobal",
			property: "Zoorix",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
