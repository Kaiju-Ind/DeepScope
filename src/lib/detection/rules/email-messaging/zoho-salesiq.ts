import type { TechnologyDefinition } from '../../types';

export const zohoSalesiqTechnologyDefinition = {
	id: "zoho-salesiq",
	name: "Zoho SalesIQ",
	website: "https://www.zoho.com/salesiq",
	description: "Zoho SalesIQ is a digital customer engagement platform that provides marketing, sales, and support teams with tools to interact with site visitors at every stage of the customer lifecycle.",
	icon: "Zoho.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "zoho-salesiq:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("salesiq\\.zohopublic\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zoho-salesiq:jsGlobal:1",
			kind: "jsGlobal",
			property: "$zoho.salesiq",
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
