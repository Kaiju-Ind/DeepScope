import type { TechnologyDefinition } from '../../types';

export const upsalesTechnologyDefinition = {
	id: "upsales",
	name: "Upsales",
	website: "https://www.upsales.com",
	description: "Upsales is an enterprise CRM and marketing automation tool.",
	icon: "Upsales.svg",
	categories: [
		"marketing-automation",
		"business-tools",
	],
	rules: [
		{
			id: "upsales:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("img\\.upsales\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
