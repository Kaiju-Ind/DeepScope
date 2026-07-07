import type { TechnologyDefinition } from '../../types';

export const helpwiseTechnologyDefinition = {
	id: "helpwise",
	name: "Helpwise",
	website: "https://helpwise.io",
	description: "Helpwise is a customer service platform that helps you manage all customer communication from a single place.",
	icon: "Helpwise.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "helpwise:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.helpwise\\.io"),
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
