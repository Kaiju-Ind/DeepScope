import type { TechnologyDefinition } from '../../types';

export const azionTechnologyDefinition = {
	id: "azion",
	name: "Azion",
	website: "https://www.azion.com/",
	description: "Azion is an edge computing, security, and content delivery platform.",
	icon: "Azion.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "azion:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Azion ", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "azion:dns:1",
			kind: "dns",
			valuePattern: new RegExp("azioncdn\\.net\\.?$", "i"),
			recordType: "CNAME",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "azion:dom:2",
			kind: "dom",
			selector: "link[href*='.azion.com/'][rel='canonical']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "azion:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^azion ", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
