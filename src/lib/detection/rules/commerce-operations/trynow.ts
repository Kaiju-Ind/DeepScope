import type { TechnologyDefinition } from '../../types';

export const trynowTechnologyDefinition = {
	id: "trynow",
	name: "TryNow",
	website: "https://www.trynow.io",
	description: "TryNow is an ecommerce platform designed to offer a try before you buy experience for shoppers.",
	icon: "TryNow.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "trynow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.trynow\\.net\\/shopify\\/([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trynow:jsGlobal:1",
			kind: "jsGlobal",
			property: "TryNowConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trynow:jsGlobal:2",
			kind: "jsGlobal",
			property: "tryNowCheckout",
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
