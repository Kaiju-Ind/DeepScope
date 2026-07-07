import type { TechnologyDefinition } from '../../types';

export const okmenuTechnologyDefinition = {
	id: "okmenu",
	name: "OkMenu",
	website: "https://oktabletmenu.com",
	description: "OkMenu is a provider of an all-in-one restaurant QR menu.",
	icon: "OkMenu.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "okmenu:dom:0",
			kind: "dom",
			selector: "div#__okmenu__",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
