import type { TechnologyDefinition } from '../../types';

export const gestimTechnologyDefinition = {
	id: "gestim",
	name: "Gestim",
	website: "https://www.gestim.it",
	description: "Gestim is an Italian real estate management system.",
	icon: "Gestim.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "gestim:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("stats\\.gestim\\.biz"),
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
