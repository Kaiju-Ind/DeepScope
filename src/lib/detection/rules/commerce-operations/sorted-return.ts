import type { TechnologyDefinition } from '../../types';

export const sortedReturnTechnologyDefinition = {
	id: "sorted-return",
	name: "Sorted Return",
	website: "https://sorted.com/give-your-customers-a-5-returns-experience/",
	description: "Sorted is a global SaaS company that provides data-driven software for checkouts, warehouses, and shipping.",
	icon: "Sorted.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "sorted-return:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("return\\.clicksit\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sorted-return:dom:1",
			kind: "dom",
			selector: "a[href*='return.clicksit.com/shop/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sorted-return:jsGlobal:2",
			kind: "jsGlobal",
			property: "clicksit_window_on_load",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
