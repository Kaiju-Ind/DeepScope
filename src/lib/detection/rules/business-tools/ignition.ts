import type { TechnologyDefinition } from '../../types';

export const ignitionTechnologyDefinition = {
	id: "ignition",
	name: "Ignition",
	website: "https://www.ignitionapp.com",
	description: "Ignition is an all-in-one platform streamlining proposals, billing, payments, and workflows for accounting and professional services firms.",
	icon: "Ignition.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "ignition:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.practiceignition\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
