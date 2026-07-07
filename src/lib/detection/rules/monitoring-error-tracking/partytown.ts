import type { TechnologyDefinition } from '../../types';

export const partytownTechnologyDefinition = {
	id: "partytown",
	name: "Partytown",
	website: "https://partytown.builder.io/",
	description: "Partytown is a lazy-loaded library to help relocate resource intensive scripts into a web worker, and off of the main thread.",
	icon: "Partytown.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "partytown:dom:0",
			kind: "dom",
			selector: "script[type*='text/partytown']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "partytown:jsGlobal:1",
			kind: "jsGlobal",
			property: "partytown",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
