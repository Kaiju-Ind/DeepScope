import type { TechnologyDefinition } from '../../types';

export const glueupTechnologyDefinition = {
	id: "glueup",
	name: "GlueUp",
	website: "https://www.glueup.com",
	description: "GlueUp is an all-in-one CRM platform.",
	icon: "GlueUp.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "glueup:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.glueup\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
