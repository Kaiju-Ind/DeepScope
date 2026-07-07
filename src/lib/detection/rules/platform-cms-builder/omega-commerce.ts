import type { TechnologyDefinition } from '../../types';

export const omegaCommerceTechnologyDefinition = {
	id: "omega-commerce",
	name: "Omega Commerce",
	website: "https://omegacommerce.com",
	description: "Omega Commerce is a suite of ecommerce tools, including Omega Instant Search, Shopping Feeds, and Mipler Advanced Reports, designed to support product discovery, data synchronization, and performance reporting for online businesses.",
	icon: "OmegaCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "omega-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.omegacommerce\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "omega-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "OMEGA_AUID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "omega-commerce:jsGlobal:2",
			kind: "jsGlobal",
			property: "OMEGA_SHOP",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
