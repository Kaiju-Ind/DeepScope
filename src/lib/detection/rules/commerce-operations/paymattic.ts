import type { TechnologyDefinition } from '../../types';

export const paymatticTechnologyDefinition = {
	id: "paymattic",
	name: "Paymattic",
	website: "https://demo.paymattic.com",
	description: "Paymattic is a WordPress payment plugin that offers built-in donation capabilities and a no-code setup for handling online payments.",
	icon: "Paymattic.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paymattic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.paymattic\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
