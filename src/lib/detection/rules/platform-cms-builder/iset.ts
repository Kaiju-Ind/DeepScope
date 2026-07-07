import type { TechnologyDefinition } from '../../types';

export const isetTechnologyDefinition = {
	id: "iset",
	name: "iSET",
	website: "https://www.iset.com.br",
	description: "iSET is an ecommerce platform providing tools to start, grow, and scale online stores.",
	icon: "iSET.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "iset:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.iset\\.io\\/"),
			description: "Script content contains a bounded technology signature.",
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
