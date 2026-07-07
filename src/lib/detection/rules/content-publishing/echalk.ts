import type { TechnologyDefinition } from '../../types';

export const echalkTechnologyDefinition = {
	id: "echalk",
	name: "eChalk",
	website: "https://www.echalk.com",
	description: "eChalk is a school website and learning management system.",
	icon: "eChalk.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "echalk:dom:0",
			kind: "dom",
			selector: "link[href*='echalk-slate-prod.s3.amazonaws']",
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
