import type { TechnologyDefinition } from '../../types';

export const workableTechnologyDefinition = {
	id: "workable",
	name: "Workable",
	website: "https://www.workable.com",
	description: "Workable is the all-in-one hiring solution.",
	icon: "Workable.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "workable:dom:0",
			kind: "dom",
			selector: "a[href*='.workable.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "workable:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunk_workable_candidate",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
