import type { TechnologyDefinition } from '../../types';

export const primegateTechnologyDefinition = {
	id: "primegate",
	name: "PrimeGate",
	website: "https://www.primegate.io",
	description: "PrimeGate is an end-to-end Russian analytics system offering a unified platform for businesses.",
	icon: "PrimeGate.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "primegate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.primegate\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "primegate:jsGlobal:1",
			kind: "jsGlobal",
			property: "PrimeGate",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
