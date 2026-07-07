import type { TechnologyDefinition } from '../../types';

export const ewayPaymentsTechnologyDefinition = {
	id: "eway-payments",
	name: "eWAY Payments",
	website: "https://www.eway.com.au/",
	description: "eWAY is a global omnichannel payment provider. The company processes secure credit card payments for merchants. eWay works through eCommerce.",
	icon: "eway.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "eway-payments:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("secure\\.ewaypayments\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "eway-payments:html:1",
			kind: "html",
			pattern: new RegExp("<img [^>]*src=\"[^/]*\\/\\/[^/]*eway\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "eway-payments:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("api\\.ewaypayments\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "eway-payments:jsGlobal:3",
			kind: "jsGlobal",
			property: "eWAY.eventHandler",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eway-payments:jsGlobal:4",
			kind: "jsGlobal",
			property: "eWAYUtils",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eway-payments:jsGlobal:5",
			kind: "jsGlobal",
			property: "ewayVars",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
