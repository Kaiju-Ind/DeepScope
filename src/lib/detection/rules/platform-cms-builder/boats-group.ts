import type { TechnologyDefinition } from '../../types';

export const boatsGroupTechnologyDefinition = {
	id: "boats-group",
	name: "Boats Group",
	website: "https://www.boatsgroup.com/websites",
	description: "Boats Group is a website platform for boat dealers and brokers.",
	icon: "Boats Group.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "boats-group:dom:0",
			kind: "dom",
			selector: "a[href*='.boatsgroup.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
