import type { TechnologyDefinition } from '../../types';

export const navidiumShippingProtectionTechnologyDefinition = {
	id: "navidium-shipping-protection",
	name: "Navidium Shipping Protection",
	website: "https://navidiumapp.com",
	description: "Navidium is a shipping insurance company that covers packages that are lost, stolen, or damaged in transit. Navidium Shipping Protection is an optional shipping protection service where, in the event of an incident (the order is damaged, lost, or stolen during transit), we will immediately re-ship any damaged, lost, or stolen products.",
	icon: "Navidium.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "navidium-shipping-protection:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^.*\\/navidium-extension-checker\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "navidium-shipping-protection:jsGlobal:1",
			kind: "jsGlobal",
			property: "nvdShop",
			valuePattern: new RegExp("\\.myshopify\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
