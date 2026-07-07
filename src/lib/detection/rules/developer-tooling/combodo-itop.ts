import type { TechnologyDefinition } from '../../types';

export const combodoItopTechnologyDefinition = {
	id: "combodo-itop",
	name: "Combodo iTop",
	website: "https://www.combodo.com/itop-193",
	description: "Combodo iTop is an open-source IT service management (ITSM) and IT operations management (ITOM) platform developed by Combodo, a software company based in France.",
	icon: "Combodo iTop.svg",
	categories: [
		"developer-tooling",
		"widgets-misc",
	],
	rules: [
		{
			id: "combodo-itop:dom:0",
			kind: "dom",
			selector: "a[href*='combodo.com/itop'] > img",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
