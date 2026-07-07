import type { TechnologyDefinition } from '../../types';

export const shoprunnerTechnologyDefinition = {
	id: "shoprunner",
	name: "Shoprunner",
	website: "https://www.shoprunner.com",
	description: "ShopRunner is a service offering consumers free two-day shipping and returns on online orders placed with certain retailers.",
	icon: "Shoprunner.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "shoprunner:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/shoprunner\\/shoprunner_init\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shoprunner:dom:1",
			kind: "dom",
			selector: "link[href*='content.shoprunner.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "shoprunner:jsGlobal:2",
			kind: "jsGlobal",
			property: "_shoprunner_com",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shoprunner:jsGlobal:3",
			kind: "jsGlobal",
			property: "_shoprunner_com.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
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
} as const satisfies TechnologyDefinition;
