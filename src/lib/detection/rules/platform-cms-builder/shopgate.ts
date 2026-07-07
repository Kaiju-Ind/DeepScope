import type { TechnologyDefinition } from '../../types';

export const shopgateTechnologyDefinition = {
	id: "shopgate",
	name: "ShopGate",
	website: "https://www.shopgate.com",
	description: "ShopGate is a provider of omnichannel commerce solutions.",
	icon: "ShopGate.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopgate:jsGlobal:0",
			kind: "jsGlobal",
			property: "ShopgateMobileHeader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopgate:jsGlobal:1",
			kind: "jsGlobal",
			property: "_shopgate",
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
