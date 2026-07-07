import type { TechnologyDefinition } from '../../types';

export const fastCheckoutTechnologyDefinition = {
	id: "fast-checkout",
	name: "Fast Checkout",
	website: "https://www.fast.co",
	description: "Fast Checkout is an one-click purchases for buyers without requiring a password to log in.",
	icon: "Fast Checkout.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fast-checkout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.fast\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fast-checkout:jsGlobal:1",
			kind: "jsGlobal",
			property: "FAST_VERSION",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fast-checkout:jsGlobal:2",
			kind: "jsGlobal",
			property: "Fast.Events",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
