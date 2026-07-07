import type { TechnologyDefinition } from '../../types';

export const laybuyTechnologyDefinition = {
	id: "laybuy",
	name: "LayBuy",
	website: "https://www.laybuy.com",
	description: "Laybuy is a payment service that lets you receive your purchase now and spread the total cost over 6 weekly automatic payments interest free.",
	icon: "LayBuy.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "laybuy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.laybuy\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "laybuy:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/woo-laybuy\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "laybuy:dom:2",
			kind: "dom",
			selector: "iframe[src='.laybuy.com/'], a[href*='.laybuy.com/what-is-laybuy']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "laybuy:jsGlobal:3",
			kind: "jsGlobal",
			property: "LaybuyHelper",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "laybuy:jsGlobal:4",
			kind: "jsGlobal",
			property: "checkout.enabledpayments.laybuy",
			valuePattern: new RegExp("^true$"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "laybuy:jsGlobal:5",
			kind: "jsGlobal",
			property: "laybuyEnableCart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "laybuy:jsGlobal:6",
			kind: "jsGlobal",
			property: "laybuyMoneyOverides",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "laybuy:jsGlobal:7",
			kind: "jsGlobal",
			property: "wc_ga_pro.available_gateways.laybuy",
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
