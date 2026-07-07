import type { TechnologyDefinition } from '../../types';

export const hclDominoTechnologyDefinition = {
	id: "hcl-domino",
	name: "HCL Domino",
	website: "https://www.hcltechsw.com/domino",
	description: "HCL Domino, formerly called IBM Domino (1995) and Lotus Domino (1989), is an enterprise server application development platform.",
	icon: "HCL Domino.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "hcl-domino:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Lotus-Domino$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hcl-domino:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^lotus-domino$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
		cpe: "cpe:2.3:a:ibm:lotus_domino:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
