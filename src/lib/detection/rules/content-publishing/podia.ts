import type { TechnologyDefinition } from '../../types';

export const podiaTechnologyDefinition = {
	id: "podia",
	name: "Podia",
	website: "https://www.podia.com",
	description: "Podia is a platform to host and sell online courses, memberships, and digital downloads.",
	icon: "Podia.svg",
	categories: [
		"content-publishing",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "podia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.podia\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "podia:jsGlobal:1",
			kind: "jsGlobal",
			property: "Podia.Checkout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "podia:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_podia_storefront_visitor_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
