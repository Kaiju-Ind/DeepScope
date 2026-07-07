import type { TechnologyDefinition } from '../../types';

export const gallaboxTechnologyDefinition = {
	id: "gallabox",
	name: "Gallabox",
	website: "https://gallabox.com",
	description: "Gallabox is a tool that transforms WhatsApp into a web chat widget, facilitating management of leads, bookings, deals, and orders.",
	icon: "Gallabox.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "gallabox:jsGlobal:0",
			kind: "jsGlobal",
			property: "gbwawc",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
