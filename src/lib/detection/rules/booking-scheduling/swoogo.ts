import type { TechnologyDefinition } from '../../types';

export const swoogoTechnologyDefinition = {
	id: "swoogo",
	name: "Swoogo",
	website: "https://swoogo.events",
	description: "Swoogo is an event management software.",
	icon: "Swoogo.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "swoogo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.swoogo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "swoogo:jsGlobal:1",
			kind: "jsGlobal",
			property: "swoogoUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
