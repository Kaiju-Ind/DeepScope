import type { TechnologyDefinition } from '../../types';

export const airwallexTechnologyDefinition = {
	id: "airwallex",
	name: "Airwallex",
	website: "https://www.airwallex.com/us",
	description: "Airwallex is a global payments and financial platform for online payments, multi-currency accounts, transfers, and embedded finance.",
	icon: "Airwallex.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "airwallex:dom:0",
			kind: "dom",
			selector: "iframe[title='Airwallex action popup'], link[href*='static.airwallex.com/widgets/sdk-controller/sdk/v1/index.js'], script#airwallex-fraud-api, script[src*='checkout.airwallex.com/'], script[src*='checkout-demo.airwallex.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "airwallex:jsGlobal:1",
			kind: "jsGlobal",
			property: "Airwallex",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "airwallex:jsGlobal:2",
			kind: "jsGlobal",
			property: "_AirwallexSDKs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
