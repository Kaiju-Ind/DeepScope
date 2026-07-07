import type { TechnologyDefinition } from '../../types';

export const onetagTechnologyDefinition = {
	id: "onetag",
	name: "OneTag",
	website: "https://onetag.com",
	description: "OneTag is an advertizing platform that automates the buying and selling of online ad space.",
	icon: "OneTag.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "onetag:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("signal-beacon\\.s-onetag\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onetag:dom:1",
			kind: "dom",
			selector: "link[href*='.s-onetag.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
