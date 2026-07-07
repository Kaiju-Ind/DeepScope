import type { TechnologyDefinition } from '../../types';

export const partialLyTechnologyDefinition = {
	id: "partial-ly",
	name: "Partial.ly",
	website: "https://partial.ly/",
	description: "Partial.ly payment plan software lets businesses offer customizable payment plans to their customers.",
	icon: "Partially.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "partial-ly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("partial\\.ly"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "partial-ly:jsGlobal:1",
			kind: "jsGlobal",
			property: "PartiallyButton",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
