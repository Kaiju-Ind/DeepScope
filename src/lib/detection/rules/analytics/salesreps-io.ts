import type { TechnologyDefinition } from '../../types';

export const salesrepsIoTechnologyDefinition = {
	id: "salesreps-io",
	name: "SalesReps.io",
	website: "https://salesreps.io",
	description: "SalesReps.io is a sales representative performance and commission reporting software provider.",
	icon: "SalesReps.io.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "salesreps-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.salesreps\\.io\\/"),
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
