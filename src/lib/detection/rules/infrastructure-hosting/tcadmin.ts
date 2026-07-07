import type { TechnologyDefinition } from '../../types';

export const tcadminTechnologyDefinition = {
	id: "tcadmin",
	name: "TCAdmin",
	website: "https://www.tcadmin.com",
	description: "TCAdmin is the game hosting control panel.",
	icon: "TCAdmin.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "tcadmin:jsGlobal:0",
			kind: "jsGlobal",
			property: "TCAdmin",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
