import type { TechnologyDefinition } from '../../types';

export const youpayTechnologyDefinition = {
	id: "youpay",
	name: "YouPay",
	website: "https://youpay.co",
	description: "YouPay is an alternative method of payment that allows you to give someone else the ability to pay for your shopping cart with no fees or interest.",
	icon: "YouPay.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "youpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.youpay\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "youpay:jsGlobal:1",
			kind: "jsGlobal",
			property: "YouPay.buttonWindow",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "youpay:jsGlobal:2",
			kind: "jsGlobal",
			property: "youpayReady",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "youpay:jsGlobal:3",
			kind: "jsGlobal",
			property: "youpayStatus",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
