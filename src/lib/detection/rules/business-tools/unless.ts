import type { TechnologyDefinition } from '../../types';

export const unlessTechnologyDefinition = {
	id: "unless",
	name: "Unless",
	website: "https://unless.com/",
	description: "Unless is an AI-driven solution to enhance customer success.",
	icon: "Unless.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "unless:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.unless\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "unless:dom:1",
			kind: "dom",
			selector: "script[data-unless]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "unless:jsGlobal:2",
			kind: "jsGlobal",
			property: "unlessComponentCleanUp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
