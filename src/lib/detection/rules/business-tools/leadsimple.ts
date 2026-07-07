import type { TechnologyDefinition } from '../../types';

export const leadsimpleTechnologyDefinition = {
	id: "leadsimple",
	name: "LeadSimple",
	website: "https://www.leadsimple.com",
	description: "LeadSimple is a platform that allows property managers to automate their sales and operational processes.",
	icon: "LeadSimple.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "leadsimple:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets2\\.leadsimple\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
