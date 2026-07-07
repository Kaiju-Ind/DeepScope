import type { TechnologyDefinition } from '../../types';

export const summercartTechnologyDefinition = {
	id: "summercart",
	name: "SummerCart",
	website: "https://www.summercart.com",
	description: "SummerCart is an ecommerce platform written in PHP.",
	icon: "SummerCart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "summercart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("summercart|sc_events|scevents", "i"),
			description: "Script source URL contains a SummerCart marker.",
		},
		{
			id: "summercart:html:2",
			kind: "html",
			pattern: new RegExp("\\b(?:SCEvents|SummerCart)\\b", "i"),
			confidence: 90,
			description: "Document HTML contains a SummerCart runtime marker.",
		},
		{
			id: "summercart:jsGlobal:1",
			kind: "jsGlobal",
			property: "SCEvents",
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
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
