import type { TechnologyDefinition } from '../../types';

export const operatebeyondTechnologyDefinition = {
	id: "operatebeyond",
	name: "OperateBeyond",
	website: "https://operatebeyond.com/dealer-websites-marketing",
	description: "OperateBeyond is a software development company that offers website design, automated inventory management, CRM, dealer websites, and DMS.",
	icon: "OperateBeyond.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "operatebeyond:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/dealer-cdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
