import type { TechnologyDefinition } from '../../types';

export const wakeCommerceTechnologyDefinition = {
	id: "wake-commerce",
	name: "Wake Commerce",
	website: "https://wake.tech/wake-commerce",
	description: "Wake Commerce is a headless ecommerce platform.",
	icon: "Wake.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wake-commerce:dom:0",
			kind: "dom",
			selector: "link[href*='.fbitsstatic.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "wake-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "Fbits",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wake-commerce:jsGlobal:2",
			kind: "jsGlobal",
			property: "fbits",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wake-commerce:jsGlobal:3",
			kind: "jsGlobal",
			property: "fbitsSearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wake-commerce:jsGlobal:4",
			kind: "jsGlobal",
			property: "fbitsSearchConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	requires: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
