import type { TechnologyDefinition } from '../../types';

export const getcompliedTechnologyDefinition = {
	id: "getcomplied",
	name: "GetComplied",
	website: "https://www.getcomplied.com",
	description: "GetComplied is a GDPR compliance platform for ecommerce platforms that supports the management of data protection requirements and regulatory obligations.",
	icon: "GetComplied.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "getcomplied:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getcomplied\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "getcomplied:jsGlobal:1",
			kind: "jsGlobal",
			property: "getComplied.api",
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
