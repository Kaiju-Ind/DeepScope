import type { TechnologyDefinition } from '../../types';

export const prefixboxTechnologyDefinition = {
	id: "prefixbox",
	name: "Prefixbox",
	website: "https://www.prefixbox.com",
	description: "Prefixbox is an AI-powered ecommerce search and product discovery platform.",
	icon: "Prefixbox.png",
	categories: [
		"search",
	],
	rules: [
		{
			id: "prefixbox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("integration\\.prefixbox\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prefixbox:dom:1",
			kind: "dom",
			selector: "[id^='prefixbox-autocomplete-']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "prefixbox:jsGlobal:2",
			kind: "jsGlobal",
			property: "prefixboxAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
