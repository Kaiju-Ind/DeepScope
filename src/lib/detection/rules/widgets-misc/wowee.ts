import type { TechnologyDefinition } from '../../types';

export const woweeTechnologyDefinition = {
	id: "wowee",
	name: "Wowee",
	website: "https://wowee.cz",
	description: "Wowee is a wishlist creation tool designed to help users organise and manage their desired items.",
	icon: "Wowee.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "wowee:dom:0",
			kind: "dom",
			selector: "script#wowee-script",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "wowee:jsGlobal:1",
			kind: "jsGlobal",
			property: "woweeScriptUrl",
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
