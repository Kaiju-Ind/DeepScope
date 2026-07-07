import type { TechnologyDefinition } from '../../types';

export const sendowlTechnologyDefinition = {
	id: "sendowl",
	name: "SendOwl",
	website: "https://www.sendowl.com",
	description: "SendOwl is a platform that provides payment links and sales page tools needed to sell products online.",
	icon: "SendOwl.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "sendowl:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("transactions\\.sendowl\\.com"),
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
