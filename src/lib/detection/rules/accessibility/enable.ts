import type { TechnologyDefinition } from '../../types';

export const enableTechnologyDefinition = {
	id: "enable",
	name: "Enable",
	website: "https://www.enable.co.il",
	description: "Enable is a web accessibility plugin by uPress.",
	icon: "Enable.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "enable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.enable\\.co\\.il\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "enable:jsGlobal:1",
			kind: "jsGlobal",
			property: "enable_toolbar.is_premium",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
