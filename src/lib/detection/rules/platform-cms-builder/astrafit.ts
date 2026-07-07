import type { TechnologyDefinition } from '../../types';

export const astrafitTechnologyDefinition = {
	id: "astrafit",
	name: "AstraFit",
	website: "https://www.astrafit.com",
	description: "AstraFit is an online virtual fitting software for large and small retailers.",
	icon: "AstraFit.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "astrafit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.astrafit\\.com\\/"),
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
