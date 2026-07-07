import type { TechnologyDefinition } from '../../types';

export const cartflowsTechnologyDefinition = {
	id: "cartflows",
	name: "CartFlows",
	website: "https://cartflows.com",
	description: "CartFlows is a WordPress and WooCommerce plugin for sales funnels, checkout flows, and order bumps.",
	icon: "Cartflows.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cartflows:jsGlobal:0",
			kind: "jsGlobal",
			property: "cartflows.active_checkout_cookie",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cartflows:jsGlobal:1",
			kind: "jsGlobal",
			property: "cartflows_checkout_optimized_fields",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:cartflows:cartflows:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
