import type { TechnologyDefinition } from '../../types';

export const plerdyTechnologyDefinition = {
	id: "plerdy",
	name: "Plerdy",
	website: "https://www.plerdy.com",
	description: "Plerdy is a SaaS solution designed to improve conversion rates for websites and online stores.",
	icon: "Plerdy.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "plerdy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.plerdy\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plerdy:jsGlobal:1",
			kind: "jsGlobal",
			property: "plerdyScript",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "plerdy:jsGlobal:2",
			kind: "jsGlobal",
			property: "plerdymainscript",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
