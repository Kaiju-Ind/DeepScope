import type { TechnologyDefinition } from '../../types';

export const iuguTechnologyDefinition = {
	id: "iugu",
	name: "iugu",
	website: "https://www.iugu.com",
	description: "iugu is a financial management platform that enables businesses to handle payments, billing, and invoicing through a unified system.",
	icon: "iugu.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "iugu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.iugu\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "iugu:jsGlobal:1",
			kind: "jsGlobal",
			property: "Iugu.CreditCard",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
