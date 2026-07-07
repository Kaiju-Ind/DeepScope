import type { TechnologyDefinition } from '../../types';

export const edgeoneTechnologyDefinition = {
	id: "edgeone",
	name: "EdgeOne",
	website: "https://edgeone.ai",
	description: "EdgeOne is an edge-service platform that delivers global content distribution, network acceleration, and integrated security protections for distributed applications.",
	icon: "EdgeOne.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "edgeone:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^TencentEdgeOne$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "edgeone:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^tencentedgeone$", "i"),
			description: "Response header matches a known technology marker.",
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
