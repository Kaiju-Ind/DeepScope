import type { TechnologyDefinition } from '../../types';

export const rollerTechnologyDefinition = {
	id: "roller",
	name: "Roller",
	website: "https://www.roller.software",
	description: "Roller is an all-in-one software that helps operators boost revenue and deliver a better guest experience.",
	icon: "Roller.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "roller:dom:0",
			kind: "dom",
			selector: "iframe#roller-widget, template[data-nitro-marker-id='roller-checkout']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "roller:jsGlobal:1",
			kind: "jsGlobal",
			property: "RollerCheckout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "roller:jsGlobal:2",
			kind: "jsGlobal",
			property: "RollerConstants",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "roller:jsGlobal:3",
			kind: "jsGlobal",
			property: "rollerDL",
			description: "Page-owned global matches a known technology marker.",
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
