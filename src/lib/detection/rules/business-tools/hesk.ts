import type { TechnologyDefinition } from '../../types';

export const heskTechnologyDefinition = {
	id: "hesk",
	name: "Hesk",
	website: "https://www.hesk.com",
	description: "Hesk is a helpdesk and customer support system.",
	icon: "Hesk.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "hesk:jsGlobal:0",
			kind: "jsGlobal",
			property: "heskKBquery",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hesk:jsGlobal:1",
			kind: "jsGlobal",
			property: "hesk_rate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hesk:jsGlobal:2",
			kind: "jsGlobal",
			property: "hesk_window",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
		cpe: "cpe:2.3:a:hesk:hesk:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
