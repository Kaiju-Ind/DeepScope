import type { TechnologyDefinition } from '../../types';

export const payrexxTechnologyDefinition = {
	id: "payrexx",
	name: "Payrexx",
	website: "https://payrexx.com",
	description: "Payrexx is an online payment solution facilitating receipt of payments across various platforms.",
	icon: "Payrexx.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "payrexx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.payrexx\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
