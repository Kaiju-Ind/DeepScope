import type { TechnologyDefinition } from '../../types';

export const slickstackTechnologyDefinition = {
	id: "slickstack",
	name: "SlickStack",
	website: "https://slickstack.io",
	description: "SlickStack is a free LEMP stack automation script written in Bash designed to enhance and simplify WordPress provisioning, performance, and security.",
	icon: "SlickStack.png",
	categories: [
		"developer-tooling",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "slickstack:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("SlickStack", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "slickstack:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("slickstack", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
