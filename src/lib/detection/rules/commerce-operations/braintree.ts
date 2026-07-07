import type { TechnologyDefinition } from '../../types';

export const braintreeTechnologyDefinition = {
	id: "braintree",
	name: "Braintree",
	website: "https://www.braintreepayments.com",
	description: "Braintree, a division of PayPal, specializes in mobile and web payment systems for ecommerce companies. Braintree provides clients with a merchant account and a payment gateway.",
	icon: "Braintree.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "braintree:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.braintreegateway\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "braintree:jsGlobal:1",
			kind: "jsGlobal",
			property: "Braintree",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "braintree:jsGlobal:2",
			kind: "jsGlobal",
			property: "Braintree.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
