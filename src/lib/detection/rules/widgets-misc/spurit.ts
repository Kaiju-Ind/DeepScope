import type { TechnologyDefinition } from '../../types';

export const spuritTechnologyDefinition = {
	id: "spurit",
	name: "SpurIT",
	website: "https://spur-i-t.com",
	description: "SpurIT is a team of certified Shopify experts which provide ecommerce software solutions.",
	icon: "SpurIT.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "spurit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-spurit\\.com\\/shopify-apps\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spurit:jsGlobal:1",
			kind: "jsGlobal",
			property: "Spurit.global.version",
			valuePattern: new RegExp("(.+)"),
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
