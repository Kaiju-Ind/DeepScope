import type { TechnologyDefinition } from '../../types';

export const hummTechnologyDefinition = {
	id: "humm",
	name: "Humm",
	website: "https://www.shophumm.com",
	description: "Humm (formerly Flexigroup) is a buy now pay later service operating in Australia.",
	icon: "Humm.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "humm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widgets\\.shophumm\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "humm:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/oxipay-payment-gateway\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "humm:jsGlobal:2",
			kind: "jsGlobal",
			property: "checkout.enabledpayments.humm",
			valuePattern: new RegExp("^true$"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
