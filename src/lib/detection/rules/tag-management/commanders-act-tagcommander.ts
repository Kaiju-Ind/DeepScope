import type { TechnologyDefinition } from '../../types';

export const commandersActTagcommanderTechnologyDefinition = {
	id: "commanders-act-tagcommander",
	name: "Commanders Act TagCommander",
	website: "https://www.commandersact.com/en/solutions/tagcommander/",
	description: "Commanders Act TagCommander is an European company providing a tag management product designed to handle website tags.",
	icon: "Commanders Act.svg",
	categories: [
		"tag-management",
	],
	rules: [
		{
			id: "commanders-act-tagcommander:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tagcommander\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "commanders-act-tagcommander:jsGlobal:1",
			kind: "jsGlobal",
			property: "tc_vars",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
