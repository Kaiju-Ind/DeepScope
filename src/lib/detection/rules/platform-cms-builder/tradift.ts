import type { TechnologyDefinition } from '../../types';

export const tradiftTechnologyDefinition = {
	id: "tradift",
	name: "Tradift",
	website: "https://www.tradift.com",
	description: "Tradift is an ecommerce solution provider offering businesses tools to streamline online sales, manage transactions, and enhance customer experiences.",
	icon: "Tradift.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tradift:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.tradift\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tradift:jsGlobal:1",
			kind: "jsGlobal",
			property: "Tradift.cdnHost",
			description: "Page-owned global matches a known technology marker.",
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
