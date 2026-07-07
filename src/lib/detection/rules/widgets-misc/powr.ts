import type { TechnologyDefinition } from '../../types';

export const powrTechnologyDefinition = {
	id: "powr",
	name: "POWR",
	website: "https://www.powr.io",
	description: "POWR is a cloud-based system of plugins that work on almost any website.",
	icon: "POWR.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "powr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.powr\\.io\\/powr\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "powr:jsGlobal:1",
			kind: "jsGlobal",
			property: "POWR_RECEIVERS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "powr:jsGlobal:2",
			kind: "jsGlobal",
			property: "loadPowr",
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
