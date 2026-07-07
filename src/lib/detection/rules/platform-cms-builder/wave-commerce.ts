import type { TechnologyDefinition } from '../../types';

export const waveCommerceTechnologyDefinition = {
	id: "wave-commerce",
	name: "Wave Commerce",
	website: "https://www.wavecommerce.hk",
	description: "Wave Commerce is a platform that supports brands with Shopify development and direct-to-consumer ecommerce growth.",
	icon: "WaveCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wave-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wavecommerce\\.hk\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wave-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "waveLocalPickup",
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
