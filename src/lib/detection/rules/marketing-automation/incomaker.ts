import type { TechnologyDefinition } from '../../types';

export const incomakerTechnologyDefinition = {
	id: "incomaker",
	name: "Incomaker",
	website: "https://www.incomaker.com",
	description: "Incomaker is a marketing and sales automation platform that centralizes lead capture, campaign management, customer engagement, and sales workflows across digital channels.",
	icon: "Incomaker.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "incomaker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.incomaker\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
