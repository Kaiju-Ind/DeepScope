import type { TechnologyDefinition } from '../../types';

export const afterpayTechnologyDefinition = {
	id: "afterpay",
	name: "Afterpay",
	website: "https://www.afterpay.com/",
	description: "Afterpay is a 'buy now, pay later' platform that makes it possible to pay off purchased goods in fortnightly instalments.",
	icon: "afterpay.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "afterpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("portal\\.afterpay\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "afterpay:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.afterpay\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "afterpay:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("present-afterpay\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "afterpay:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("afterpay-products\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "afterpay:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.stripe\\.com\\/v3\\/fingerprinted\\/js\\/elements-afterpay-clearpay-message-.+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "afterpay:dom:5",
			kind: "dom",
			selector: "#afterpay, .afterpay, .AfterpayMessage, [aria-label='Afterpay'], link[href*='/wp-content/plugins/afterpay-gateway-for-woocommerce/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "afterpay:jsGlobal:6",
			kind: "jsGlobal",
			property: "Afterpay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "afterpay:jsGlobal:7",
			kind: "jsGlobal",
			property: "Afterpay.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "afterpay:jsGlobal:8",
			kind: "jsGlobal",
			property: "AfterpayAttractWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "afterpay:jsGlobal:9",
			kind: "jsGlobal",
			property: "AfterpayGenericErrorHtml",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "afterpay:jsGlobal:10",
			kind: "jsGlobal",
			property: "AfterpayWidgetHtml",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "afterpay:jsGlobal:11",
			kind: "jsGlobal",
			property: "afterpay_product",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "afterpay:jsGlobal:12",
			kind: "jsGlobal",
			property: "checkout.enabledpayments.afterpay",
			valuePattern: new RegExp("^true$"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "afterpay:scriptContent:13",
			kind: "scriptContent",
			pattern: new RegExp("AFTERPAY"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "afterpay:jsGlobal:14",
			kind: "jsGlobal",
			property: "AfterPay",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:afterpay:afterpay:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
