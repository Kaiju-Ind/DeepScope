import type { TechnologyDefinition } from '../../types';

export const stripeTechnologyDefinition = {
	id: "stripe",
	name: "Stripe",
	website: "https://stripe.com",
	description: "Stripe offers online payment processing for internet businesses as well as fraud prevention, invoicing and subscription management.",
	icon: "Stripe.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "stripe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.stripe\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "stripe:html:1",
			kind: "html",
			pattern: new RegExp("<input[^>]+data-stripe"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "stripe:jsGlobal:2",
			kind: "jsGlobal",
			property: "Stripe.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stripe:jsGlobal:3",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.appSettings.STRIPE_API_PUBLIC_KEY",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stripe:jsGlobal:4",
			kind: "jsGlobal",
			property: "checkout.enabledpayments.stripe",
			valuePattern: new RegExp("^true$"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stripe:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^__stripe_mid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "stripe:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^__stripe_sid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "stripe:dns:7",
			kind: "dns",
			valuePattern: new RegExp("stripe-verification=", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "stripe:dom:8",
			kind: "dom",
			selector: "a[href*='billing.stripe.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "stripe:dom:9",
			kind: "dom",
			selector: "a[href*='checkout.stripe.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "stripe:dom:10",
			kind: "dom",
			selector: "input[data-stripe]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "stripe:jsGlobal:11",
			kind: "jsGlobal",
			property: "stripePublicKey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stripe:dom:12",
			kind: "dom",
			selector: "a[href*='billing.stripe.com'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "stripe:dom:13",
			kind: "dom",
			selector: "a[href*='billing.stripe.com'],a[href*='checkout.stripe.com'], input[data-stripe]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
		cpe: "cpe:2.3:a:stripe:stripe:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
