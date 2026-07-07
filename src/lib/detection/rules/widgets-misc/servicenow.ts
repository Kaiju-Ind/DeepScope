import type { TechnologyDefinition } from '../../types';

export const servicenowTechnologyDefinition = {
	id: "servicenow",
	name: "ServiceNow",
	website: "https://www.servicenow.com",
	description: "ServiceNow is a cloud computing platform to help companies manage digital workflows for enterprise operations.",
	icon: "ServiceNow.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "servicenow:dom:0",
			kind: "dom",
			selector: "a[href*='.service-now.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "servicenow:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.service-now\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "servicenow:jsGlobal:2",
			kind: "jsGlobal",
			property: "s_giq",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"high",
			"poa",
		],
		cpe: "cpe:2.3:a:servicenow:servicenow:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
