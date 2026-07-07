import type { TechnologyDefinition } from '../../types';

export const speedecomTechnologyDefinition = {
	id: "speedecom",
	name: "SpeedEcom",
	website: "https://speed-ecom.eu",
	description: "SpeedEcom is a web marketing and dropshipping solution for Shopify.",
	icon: "SpeedEcom.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "speedecom:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.speed-ecom\\.eu\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
