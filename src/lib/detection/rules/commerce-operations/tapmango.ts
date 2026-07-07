import type { TechnologyDefinition } from '../../types';

export const tapmangoTechnologyDefinition = {
	id: "tapmango",
	name: "TapMango",
	website: "https://www.tapmango.com",
	description: "TapMango is a customizable customer loyalty program and online ordering platform designed to enhance customer engagement and streamline ordering processes.",
	icon: "TapMango.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "tapmango:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("shopify\\.tapmango\\.com"),
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
