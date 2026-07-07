import type { TechnologyDefinition } from '../../types';

export const govaloTechnologyDefinition = {
	id: "govalo",
	name: "Govalo",
	website: "https://govalo.com",
	description: "Govalo is a software startup company that builds a Shopify app.",
	icon: "Govalo.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "govalo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shopify\\.com\\/extensions\\/.+\\/([\\d\\.]+)\\/assets\\/govalo\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "govalo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Govalo.meta",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
