import type { TechnologyDefinition } from '../../types';

export const bsportTechnologyDefinition = {
	id: "bsport",
	name: "Bsport",
	website: "https://pro.bsport.io",
	description: "Bsport is a fitness/boutique studio management software for scheduling, memberships, and client management.",
	icon: "Bsport.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bsport:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.bsport\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bsport:jsGlobal:1",
			kind: "jsGlobal",
			property: "BsportWidget.el_list_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bsport:jsGlobal:2",
			kind: "jsGlobal",
			property: "runtimeBsport",
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
