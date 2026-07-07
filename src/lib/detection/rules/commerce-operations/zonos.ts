import type { TechnologyDefinition } from '../../types';

export const zonosTechnologyDefinition = {
	id: "zonos",
	name: "Zonos",
	website: "https://zonos.com",
	description: "Zonos is a cross-border ecommerce software and app solution for companies with international business.",
	icon: "Zonos.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "zonos:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.zonos\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zonos:jsGlobal:1",
			kind: "jsGlobal",
			property: "Zonos",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zonos:jsGlobal:2",
			kind: "jsGlobal",
			property: "zonos",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zonos:jsGlobal:3",
			kind: "jsGlobal",
			property: "zonosCheckout",
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
