import type { TechnologyDefinition } from '../../types';

export const tapcartTechnologyDefinition = {
	id: "tapcart",
	name: "Tapcart",
	website: "https://tapcart.com",
	description: "Tapcart is a mobile commerce SaaS platform that integrates directly with Shopify.",
	icon: "Tapcart.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "tapcart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.tapcart\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tapcart:dom:1",
			kind: "dom",
			selector: "a[href*='tapcart.app'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tapcart:jsGlobal:2",
			kind: "jsGlobal",
			property: "tapcartwebBanner",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tapcart:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tapcart\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tapcart:jsGlobal:4",
			kind: "jsGlobal",
			property: "Tapcart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tapcart:jsGlobal:5",
			kind: "jsGlobal",
			property: "tapcartParams",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
