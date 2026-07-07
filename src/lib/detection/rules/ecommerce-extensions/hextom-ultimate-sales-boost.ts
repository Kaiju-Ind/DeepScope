import type { TechnologyDefinition } from '../../types';

export const hextomUltimateSalesBoostTechnologyDefinition = {
	id: "hextom-ultimate-sales-boost",
	name: "Hextom Ultimate Sales Boost",
	website: "https://hextom.com/case_study/ultimate-sales-boost",
	description: "Ultimate Sales Boost by Hextom is an app designed to help you drive more sales by creating a sense of urgency, scarcity and trust.",
	icon: "Hextom.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "hextom-ultimate-sales-boost:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hextom\\.com\\/js\\/ultimatesalesboost\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hextom-ultimate-sales-boost:jsGlobal:1",
			kind: "jsGlobal",
			property: "hextom_usb",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hextom-ultimate-sales-boost:jsGlobal:2",
			kind: "jsGlobal",
			property: "ht_usb.isLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
