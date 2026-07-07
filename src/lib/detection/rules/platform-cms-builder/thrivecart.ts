import type { TechnologyDefinition } from '../../types';

export const thrivecartTechnologyDefinition = {
	id: "thrivecart",
	name: "ThriveCart",
	website: "https://thrivecart.com",
	description: "ThriveCart is a sales cart solution that lets you create checkout pages for your online products and services.",
	icon: "ThriveCart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "thrivecart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("thrivecart\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "thrivecart:jsGlobal:1",
			kind: "jsGlobal",
			property: "ThriveCart",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
