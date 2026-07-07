import type { TechnologyDefinition } from '../../types';

export const boltPaymentsTechnologyDefinition = {
	id: "bolt-payments",
	name: "Bolt Payments",
	website: "https://www.bolt.com/",
	description: "Bolt powers a checkout experience designed to convert shoppers.",
	icon: "Bolt.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "bolt-payments:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("connect\\.bolt\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bolt-payments:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("account\\.bolt\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bolt-payments:requestUrl:2",
			kind: "requestUrl",
			pattern: new RegExp("connect\\.bolt\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "bolt-payments:dom:3",
			kind: "dom",
			selector: "bolt-checkout-button",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bolt-payments:jsGlobal:4",
			kind: "jsGlobal",
			property: "BoltCheckout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bolt-payments:jsGlobal:5",
			kind: "jsGlobal",
			property: "BoltPopup",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bolt-payments:jsGlobal:6",
			kind: "jsGlobal",
			property: "BoltTrack",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bolt-payments:jsGlobal:7",
			kind: "jsGlobal",
			property: "bolt_callbacks",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
