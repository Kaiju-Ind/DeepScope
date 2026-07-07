import type { TechnologyDefinition } from '../../types';

export const returnlyTechnologyDefinition = {
	id: "returnly",
	name: "Returnly",
	website: "https://returnly.com",
	description: "Returnly is the provider of digital return experiences for direct-to-consumer brands.",
	icon: "Returnly.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "returnly:dom:0",
			kind: "dom",
			selector: "a[href*='.returnly.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "returnly:jsGlobal:1",
			kind: "jsGlobal",
			property: "Returnly.ContainerSwitcher",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "returnly:jsGlobal:2",
			kind: "jsGlobal",
			property: "Returnly.InternalEventTracker",
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
