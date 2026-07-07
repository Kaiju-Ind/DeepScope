import type { TechnologyDefinition } from '../../types';

export const buroguTechnologyDefinition = {
	id: "burogu",
	name: "BUROGU",
	website: "https://burogu.pro",
	description: "Burogu is a no-code platform that enables users to create and manage blogs.",
	icon: "BUROGU.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "burogu:dom:0",
			kind: "dom",
			selector: "link[href*='stats.burogu.pro']",
			description: "DOM selector matches a known technology marker.",
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
