import type { TechnologyDefinition } from '../../types';

export const sortableTechnologyDefinition = {
	id: "sortable",
	name: "Sortable",
	website: "https://sortable.com",
	description: "Sortable is a broad-spectrum platform that helps publishers unify demand partners, data, and tools.",
	icon: "Sortable.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "sortable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.deployads\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sortable:jsGlobal:1",
			kind: "jsGlobal",
			property: "deployads",
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
