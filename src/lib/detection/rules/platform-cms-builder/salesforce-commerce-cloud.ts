import type { TechnologyDefinition } from '../../types';

export const salesforceCommerceCloudTechnologyDefinition = {
	id: "salesforce-commerce-cloud",
	name: "Salesforce Commerce Cloud",
	website: "https://demandware.com",
	description: "Salesforce Commerce Cloud is a cloud-based software-as-a-service (SaaS) ecommerce solution.",
	icon: "Salesforce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "salesforce-commerce-cloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/demandware\\.static\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salesforce-commerce-cloud:jsGlobal:1",
			kind: "jsGlobal",
			property: "dwAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce-commerce-cloud:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^dw_dnt$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "salesforce-commerce-cloud:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^dwsid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "salesforce-commerce-cloud:header:4",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Demandware eCommerce Server", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "salesforce-commerce-cloud:header:5",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("demandware ecommerce server", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"salesforce",
	],
} as const satisfies TechnologyDefinition;
